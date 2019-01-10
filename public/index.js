/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
function displayLoginScreen() {
  // Display correct screen
  showScreenManager('login');
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
      displaySignupScreen();
    });
  }
}

function displaySignupScreen() {
  // Display correct screen
  showScreenManager('signup');
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
      displayLoginScreen();
    });
  }
}
function displayAllClientsScreen() {
  // Display correct screen
  showScreenManager('client-list');
  // Add delete client button event listener
  $('.client-list').on('click', '.delete-client', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $(event.target)
      .closest('.client')
      .data('id');
    requestDeleteClient(clientId);
  });
  $('.client-list').on('click', '.client', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $(event.target)
      .closest('.client')
      .data('id');
    showScreenManager('client-detail');
    displayClientDetailScreen(clientId);
  });
  requestGetAllClients(displayClientList);
}

function displayClientDetailScreen(clientId) {
  $('.client-details').empty();
  // Display correct screen
  showScreenManager('client-details');
  let clientString = '';
  requestGetOneClient(clientId, (clientData) => {
    Object.entries(clientData).forEach(([key, value]) => {
      clientString += `<p><strong>${key}:</strong> ${value}</p>`;
    });
    clientString += '<input type="button" class="update-client-modal" value="update">';
    clientString += '<input type="button" class="return-to-list" value="Go Back to list">';
    $('.client-details').append(clientString);
    $('.client-details').on('click', '.return-to-list', (event) => {
      event.preventDefault();
      event.stopPropagation();
      showScreenManager('client-list');
      $('.client-details').empty();
    });
    // Add update client button event listener
    $('.client-details').on('click', '.update-client-modal', (event) => {
      event.preventDefault();
      event.stopPropagation();
      modal.open({ content: 'update', width: 340, height: 300 });
      requestGetOneClient(clientId, (clientData) => {
        $('#client-firstName').val(clientData.firstName);
        $('#client-lastName').val(clientData.lastName);
        $('#client-company').val(clientData.company);
        $('#client-address').val(clientData.address);
        $('#client-phoneNumber').val(clientData.phoneNumber);
        $('#client-email').val(clientData.email);
      });
      // Add event listener to the modal that popped up.
      $('.client-update-form').submit((e) => {
        e.preventDefault();
        e.stopPropagation();
        const updatedClientInfo = {
          firstName: $('#client-firstName').val(),
          lastName: $('#client-lastName').val(),
          company: $('#client-company').val(),
          address: $('#client-address').val(),
          phoneNumber: $('#client-phoneNumber').val(),
          email: $('#client-email').val(),
          id: clientId,
        };
        requestUpdateClient(clientId, updatedClientInfo);
        modal.close();
        displayClientDetailScreen(clientId);
      });
    });
  });
  // Show client details
}

function displayClientList(data) {
  if (!data.error) {
    $('.client-list').empty();
    data.forEach((element) => {
      let clientHTML = '';
      clientHTML += `<p><strong>Name:</strong> ${element.firstName} ${element.lastName}</p>`;
      // clientHTML += `<p><strong>Phone:</strong> ${element.phoneNumber}</p>`;
      // clientHTML += `<p><strong>Email:</strong> ${element.email}</p>`;
      clientHTML += '<input type="button" class="delete-client" value="delete">';
      // clientHTML += '<input type="button" class="update-client-modal" value="update">';
      $('.client-list').append(`<div class="client" data-id="${element._id}">${clientHTML}</div>`);
    });
  }
}

function requestGetAllClients(callbackFunction) {
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

function requestGetOneClient(clientId, callbackFunction) {
  fetch(`/api/clients/${clientId}`, {
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

function requestAddClient(newClient) {
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
    .then(() => requestGetAllClients(displayClientList));
}

function requestUpdateClient(clientId, updatedClient) {
  fetch(`/api/clients/${clientId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(updatedClient),
  })
    .then(response => response.json())
    .then(() => requestGetAllClients(displayClientList));
}

function requestDeleteClient(clientId) {
  fetch(`/api/clients/${clientId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    method: 'DELETE',
  }).then(() => requestGetAllClients(displayClientList));
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
  $('.add-client-modal').on('click', () => {
    modal.open({ content: 'add', width: 340, height: 300 });
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
      requestAddClient(newClient);
      modal.close();
    });
  });
}

function showScreenManager(screenToShow) {
  // Hide all screens
  $('.user-signup-login').addClass('hidden');
  $('.user-login-form').addClass('hidden');
  $('.user-signup-form').addClass('hidden');
  $('.clients-screen').addClass('hidden');
  $('.client-list-header').addClass('hidden');
  $('.client-options').addClass('hidden');
  $('.client-list').addClass('hidden');
  $('.client-details').addClass('hidden');
  $('body').removeClass('justified-center');

  // Show only requested screens
  switch (screenToShow) {
    case 'login':
      $('.user-signup-login').removeClass('hidden');
      $('.user-login-form').removeClass('hidden');
      $('body').addClass('justified-center');
      break;
    case 'signup':
      $('.user-signup-login').removeClass('hidden');
      $('.user-signup-form').removeClass('hidden');
      $('body').addClass('justified-center');
      break;
    case 'client-list':
      $('.clients-screen').removeClass('hidden');
      $('.client-list-header').removeClass('hidden');
      $('.client-options').removeClass('hidden');
      $('.client-list').removeClass('hidden');
      break;
    case 'client-details':
      $('.clients-screen').removeClass('hidden');
      $('.client-details').removeClass('hidden');
      $('body').addClass('justified-center');
      break;
    default:
      break;
  }
}

$(() => {
  addEventHandlersToButtons();
  checkForAuth();
  // displayAddClientArea();
  // getAndDisplayClients();
});
