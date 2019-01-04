/* eslint-disable no-use-before-define */
function displayLogin() {
  $('.user-login-form').html(`
        <fieldset>
          <legend>Log in</legend>
          <div class='login-error error'></div>
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
        </fieldset>`);
  $('.switch-to-signup-button').on('click', (event) => {
    event.preventDefault();
    if (!$('.user-signup-form').html()) {
      displaySignup();
    }
    $('.user-login-form').toggleClass('hidden');
    $('.user-signup-form').toggleClass('hidden');
  });
}

function displaySignup() {
  $('.user-signup-form').html(`
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
        </fieldset>`);
  $('.switch-to-login-button').on('click', (event) => {
    event.preventDefault();
    if (!$('.user-login-form').html()) {
      displayLogin();
    }
    $('.user-signup-form').toggleClass('hidden');
    $('.user-login-form').toggleClass('hidden');
  });
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
      method: 'DELETE',
    }).then(getAndDisplayClients());
  });
  getAndDisplayClients();
}

function getClients(callbackFunction) {
  fetch('/api/clients')
    .then(response => response.json())
    .then(responseJson => callbackFunction(responseJson));
}

function getAndDisplayClients() {
  getClients(displayClients);
}

function addClientToList(newClient) {
  fetch('/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newClient),
  })
    .then(response => response.json())
    .then(() => getAndDisplayClients());
}

function signUpUser(newUser) {
  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => {
      console.log(responseJson);
      $('.user-signup-form').toggleClass('hidden');
      $('.client-add').toggleClass('hidden');
      $('.client-list').toggleClass('hidden');
      displayAddClientArea();
    })
    .catch(error => $('.signup-error').text(`${error}`));
}

function loginUser(user) {
  $('.login-error').text('');
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => {
      console.log(responseJson);
      $('.user-login-form').toggleClass('hidden');
      displayAddClientArea();
    })
    .catch(error => $('.login-error').text(`${error}`));
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
}

$(() => {
  displayLogin();
  // displayAddClientArea();
  // getAndDisplayClients();
  addEventHandlersToButtons();
});
