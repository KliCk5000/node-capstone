/* eslint-disable no-use-before-define */
function displayLogin() {
  // Hide all other screens
  $('.user-signup-form').addClass('hidden');
  $('.client-add').addClass('hidden');
  $('.client-list').addClass('hidden');
  // Show the login form, even if it doesn't have the HTML yet
  $('.user-login-form').removeClass('hidden');
  $('.user-login-form').trigger('reset');
  // Here is the HTML that will display
  const loginUserFormHTML = `
  <fieldset>
    <legend>Log in</legend>
    <div class='login-error error'></div>
    <div class='login-success success'></div>
    <label for="login-user-username">Username</label>
    <input
      type="text"
      name="login-user-username"
      id="login-user-username"
      required
    />
    <label for="login-user-password">Password</label>
    <input
      type="password"
      name="login-user-password"
      id="login-user-password"
      required
    />
    <button type="submit">Log in</button>
    <button class="switch-to-signup-button" type="button">
      Sign up instead
    </button>
  </fieldset>`;
  // If the login html and button hasn't been already set, set it.
  if (!$('.user-login-form').html()) {
    // Login form HTML
    $('.user-login-form').html(loginUserFormHTML);
    // Button to switch to Login form
    $('.switch-to-signup-button').on('click', (event) => {
      event.preventDefault();
      displaySignup();
    });
  }
}

function displaySignup() {
  // Hide all other screens
  $('.user-login-form').addClass('hidden');
  $('.client-add').addClass('hidden');
  $('.client-list').addClass('hidden');
  // Show the signup form, even if it doesn't have the HTML yet
  $('.user-signup-form').removeClass('hidden');
  $('.user-signup-form').trigger('reset');
  // Here is the HTML that will display
  const signupUserFormHTML = `
        <fieldset>
          <legend>Sign up</legend>
          <div class='signup-error error'></div>
          <label for="user-signup-username">Username</label>
          <input
            type="text"
            name="signup-user-username"
            id="signup-user-username"
            required
          />
          <label for="signup-user-password">Password</label>
          <input
            type="password"
            name="signup-user-password"
            id="signup-user-password"
            pattern=".{10,72}"
            title="Password must be at least 10 characters, up to a maximum of 72."
            required
          />
          <label for="signup-user-firstName">First Name</label>
          <input
            type="text"
            name="signup-user-firstName"
            id="signup-user-firstName"
          />
          <label for="signup-user-lastName">Last Name</label>
          <input
            type="text"
            name="signup-user-lastName"
            id="signup-user-lastName"
          />
          <button type="submit">Sign up</button>
          <button class="switch-to-login-button" type="button">
            Log in instead
          </button>
        </fieldset>`;
  // If the signup html and button hasn't been already set, set it.
  if (!$('.user-signup-form').html()) {
    $('.user-signup-form').html(signupUserFormHTML);
    // Button to switch to login form
    $('.switch-to-login-button').on('click', (event) => {
      event.preventDefault();
      displayLogin();
    });
  }
}

function displayClients(data) {
  let clientListHTML = '';
  data.forEach((element) => {
    clientListHTML += `<p><strong>Name:</strong> ${element.firstName} ${element.lastName}</p>`;
    clientListHTML += `<p><strong>Phone:</strong> ${element.phoneNumber}</p>`;
    clientListHTML += `<p><strong>Email:</strong> ${element.email}</p>`;
    clientListHTML += `<input type="button" class="delete-client" id="${
      element._id
    }" value="delete">`;
    // NOTE: This code shows all key value pairs instead
    // Object.entries(element).forEach(([key, value]) => {
    //   clientString += `<p><strong>${key}:</strong> ${value}</p>`;
    // });
  });
  $('.client-list').html(`<div class="client">${clientListHTML}</div><br/>`);
}

function displayAddClientArea() {
  $('.user-signup-form').addClass('hidden');
  $('.user-login-form').addClass('hidden');
  $('.client-add').removeClass('hidden');
  $('.client-list').removeClass('hidden');
  $('.client-add-form').submit((event) => {
    event.preventDefault();
    const newClient = {
      firstName: $('#client-firstName').val(),
      lastName: $('#client-lastName').val(),
      company: $('#client-company').val(),
      address: $('#client-address').val(),
      phoneNumber: $('#client-phoneNumber').val(),
      email: $('#client-email').val(),
    };
    addClientToList(newClient);
  });
  $('.client-list').on('click', '.delete-client', (event) => {
    event.preventDefault();
    console.log(event.target.id);
    fetch(`/api/clients/${event.target.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      method: 'DELETE',
    }).then(getAndDisplayClients());
  });
  getAndDisplayClients();
}

function getClients(callbackFunction) {
  fetch('/api/clients', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    method: 'GET',
  })
    .then(response => response.json())
    .then(responseJson => callbackFunction(responseJson));
}

function getAndDisplayClients() {
  getClients(displayClients);
}

function addClientToList(newClient) {
  fetch('/api/clients', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(newClient),
  })
    .then(response => response.json())
    .then(() => getAndDisplayClients());
}

function addEventHandlersToButtons() {
  $('.user-signup-form').submit((event) => {
    event.preventDefault();
    const newUser = {
      username: $('#signup-user-username').val(),
      password: $('#signup-user-password').val(),
      firstName: $('#signup-user-firstName').val(),
      lastName: $('#signup-user-lastName').val(),
    };
    signUpUser(newUser);
  });
  $('.user-login-form').submit((event) => {
    event.preventDefault();
    const user = {
      username: $('#login-user-username').val(),
      password: $('#login-user-password').val(),
    };
    loginUser(user);
  });
  $('.logoutUser').on('click', () => {
    logoutUser();
  });
}

$(() => {
  addEventHandlersToButtons();
  checkForAuth();
  // displayAddClientArea();
  // getAndDisplayClients();
});
