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
    <div class="form-questions">
      <div class="login-form-row">
        <label for="login-user-username">Username</label>
        <input
          type="text"
          name="login-user-username"
          id="login-user-username"
          required
        />
        </div>
        <div class="login-form-row">
        <label for="login-user-password">Password</label>
        <input
          type="password"
          name="login-user-password"
          id="login-user-password"
          required
        />
      </div>
    </div>
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
          <div class="form-questions">
            <div class="login-form-row">
              <label for="user-signup-username">Username</label>
              <input
                type="text"
                name="signup-user-username"
                id="signup-user-username"
                required
              />
            </div>
            <div class="login-form-row">
              <label for="signup-user-password">Password</label>
              <input
                type="password"
                name="signup-user-password"
                id="signup-user-password"
                pattern=".{10,72}"
                title="Password must be at least 10 characters, up to a maximum of 72."
                required
              />
            </div>
            <div class="login-form-row">
              <label for="signup-user-firstName">First Name</label>
              <input
                type="text"
                name="signup-user-firstName"
                id="signup-user-firstName"
              />
            </div>
            <div class="login-form-row">
              <label for="signup-user-lastName">Last Name</label>
              <input
                type="text"
                name="signup-user-lastName"
                id="signup-user-lastName"
              />
            </div>
          </div>
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
  // Change username at the top
  requestGetUser().then(user => $('.user-text').text(`${user.firstName} ${user.lastName}`));
  // Display correct screen
  showScreenManager('client-list');
  requestGetAllClients(displayClientList);
}

function displayClientDetailScreen(clientId) {
  // Display correct screen
  showScreenManager('client-details');
  Promise.all([requestGetOneClient(clientId), requestGetAllNotes(clientId)])
    .then((responseArray) => {
      const clientData = responseArray[0];
      const notesData = responseArray[1];
      const clientDetails = generateClientDetails(clientData, notesData);
      $('.client-details').html(
        `<div class="client-detail-card" data-id="${clientId}">${clientDetails}</div>`,
      );
    })
    .catch(error => console.log(error.message));
}

function generateClientDetails(clientData, notesData) {
  let clientDetails = '';
  clientDetails += `
  <div class="client-detail-top">
    <div class="client-image-container">
      <img class="client-img-portrait" src="${clientData.userImg}">
    </div>
    <div class="client-detail-container">
      <div class="client-name client-detail-row">
        <i class="fas fa-font"></i>
        ${clientData.firstName} ${clientData.lastName}</div>
      <div class="client-company client-detail-row">
        <i class="fas fa-building"></i>
        ${clientData.company}</div>
      <div class="client-phoneNumber client-detail-row">
        <i class="fas fa-phone"></i>
        ${clientData.phoneNumber}</div>
      <div class="client-email client-detail-row">
        <i class="fas fa-envelope"></i>
        ${clientData.email}</div>
      <div class="client-address client-detail-row">
        <i class="fas fa-map-marker"></i>
        ${clientData.address}</div>
    </div>
  </div>
    <div class="client-notes">
      <div class="client-notes-header">Notes:</div>
  `;
  clientDetails += notesData
    .map(
      note => `
    <div class="note-card" data-id="${note._id}">
      <div class="note-fields">
        <span class="note-description">${note.description}</span>
        Note: <span class="note-body">${note.noteBody}</span>
      </div>
      <div class="note-buttons">
        <input type="button" class="edit-note" value="edit">
        <input type="button" class="save-note hidden" value="save">
        <input type="button" class="fas fa-trash delete-note" value="&#xf2ed">
      </div>
    </div>`,
    )
    .join('');
  clientDetails += '</div>';
  clientDetails += '<input type="button" class="add-client-note" value="Add Note">';
  clientDetails += '<input type="button" class="update-client-modal" value="update">';
  clientDetails += '<input type="button" class="return-to-list" value="Go Back to list">';
  return clientDetails;
}

function displayClientList(data) {
  if (!data.error) {
    let clientListHTML = '';
    data.forEach((element) => {
      let clientHTML = '';
      clientHTML += `<div class="client-icon-container ${
        element.clientColor
      }"><span class="client-icon-letter">${element.firstName.charAt(0)}</span></div>`;
      clientHTML += `<span class="client-list-name">${element.firstName} ${
        element.lastName
      }</span>`;
      // clientHTML += `<p><strong>Phone:</strong> ${element.phoneNumber}</p>`;
      // clientHTML += `<p><strong>Email:</strong> ${element.email}</p>`;
      clientHTML += '<input type="button" class="fas fa-trash delete-client" value="&#xf2ed">';
      // clientHTML += '<input type="button" class="update-client-modal" value="update">';
      clientListHTML += `<div class="client" data-id="${element._id}">${clientHTML}</div>`;
    });
    $('.client-list').html(clientListHTML);
  }
}

function requestGetUser() {
  return fetch('/api/users', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    method: 'GET',
  }).then(response => response.json());
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

function requestGetOneClient(clientId) {
  return fetch(`/api/clients/${clientId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    method: 'GET',
  }).then(response => response.json());
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

function requestGetAllNotes(clientId) {
  return fetch(`/api/notes/${clientId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    method: 'GET',
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

function requestAddNote(clientId, newNote) {
  fetch(`/api/notes/${clientId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    method: 'POST',
    body: JSON.stringify(newNote),
  })
    .then(response => response.json())
    .then(responseJson => displayClientDetailScreen(responseJson.client))
    .catch(error => console.log(error));
}

function requestDeleteNote(clientId, noteId) {
  fetch(`/api/notes/${noteId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    method: 'DELETE',
  })
    .then(() => displayClientDetailScreen(clientId))
    .catch(error => console.log(error));
}

function requestUpdateNote(noteId, updatedNote) {
  fetch(`/api/notes/${noteId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    body: JSON.stringify(updatedNote),
  })
    .then(response => response.json())
    .then(responseJson => displayClientDetailScreen(responseJson.client));
}

function showScreenManager(screenToShow) {
  // Hide all screens
  $('.js-login-screen').addClass('hidden');
  $('.js-signup-screen').addClass('hidden');
  $('.js-clients-screen').addClass('hidden');
  $('.js-client-details-screen').addClass('hidden');
  $('.screen').removeClass('justified-center');
  $('.user-container').addClass('hidden');

  // Show only requested screens
  switch (screenToShow) {
    case 'login':
      $('.js-login-screen').removeClass('hidden');
      $('.screen').addClass('justified-center');
      break;
    case 'signup':
      $('.js-signup-screen').removeClass('hidden');
      $('.screen').addClass('justified-center');
      break;
    case 'client-list':
      $('.user-container').removeClass('hidden');
      $('.js-clients-screen').removeClass('hidden');
      break;
    case 'client-details':
      $('.user-container').removeClass('hidden');
      $('.js-client-details-screen').removeClass('hidden');
      $('.screen').addClass('justified-center');
      break;
    default:
      break;
  }
}

function addAllEventHandlers() {
  $('body').on('submit', '.user-signup-form', (event) => {
    event.preventDefault();
    const newUser = {
      username: $('#signup-user-username').val(),
      password: $('#signup-user-password').val(),
      firstName: $('#signup-user-firstName').val(),
      lastName: $('#signup-user-lastName').val(),
    };
    signUpUser(newUser);
  });

  $('body').on('submit', '.user-login-form', (event) => {
    event.preventDefault();
    const user = {
      username: $('#login-user-username').val(),
      password: $('#login-user-password').val(),
    };
    loginUser(user);
  });

  $('body').on('click', '.user-logout-button', () => {
    $('.user-text').text('Not logged in');
    logoutUser();
  });

  $('body').on('click', '.add-client-modal', () => {
    modal.open({ content: 'add' });
  });

  $('body').on('submit', '.client-add-form', (event) => {
    event.preventDefault();
    const colorArray = ['yellow', 'green', 'cyan', 'blue', 'purple'];
    const randomInt = Math.floor(Math.random() * colorArray.length);
    const newClient = {
      firstName: $('#client-firstName').val(),
      lastName: $('#client-lastName').val(),
      company: $('#client-company').val(),
      address: $('#client-address').val(),
      phoneNumber: $('#client-phoneNumber').val(),
      email: $('#client-email').val(),
      clientColor: colorArray[randomInt],
    };
    requestAddClient(newClient);
    modal.close();
  });

  $('body').on('click', '.return-to-list', (event) => {
    event.preventDefault();
    event.stopPropagation();
    showScreenManager('client-list');
    $('.client-details').empty();
  });

  // Add update client button event listener
  $('body').on('click', '.update-client-modal', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $(event.target)
      .closest('.client-detail-card')
      .data('id');
    modal.open({ content: 'update' });
    requestGetOneClient(clientId).then((clientData) => {
      $('#client-update-submit').attr('data-id', `${clientId}`);
      $('#client-firstName').val(clientData.firstName);
      $('#client-lastName').val(clientData.lastName);
      $('#client-company').val(clientData.company);
      $('#client-address').val(clientData.address);
      $('#client-phoneNumber').val(clientData.phoneNumber);
      $('#client-email').val(clientData.email);
    });
  });
  // Add event listener to the modal that popped up.
  $('body').on('submit', '.client-update-form', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $('#client-update-submit').attr('data-id');
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

  $('body').on('click', '.delete-client', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $(event.target)
      .closest('.client')
      .data('id');
    requestDeleteClient(clientId);
  });

  $('body').on('click', '.client', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $(event.target)
      .closest('.client')
      .data('id');
    showScreenManager('client-detail');
    displayClientDetailScreen(clientId);
  });

  $('body').on('click', '.client-add-random', (event) => {
    event.preventDefault();
    event.stopPropagation();
    $('#client-firstName').val(faker.name.firstName);
    $('#client-lastName').val(faker.name.lastName);
    $('#client-company').val(faker.company.companyName);
    $('#client-address').val(faker.address.streetAddress);
    $('#client-phoneNumber').val(faker.phone.phoneNumber);
    $('#client-email').val(faker.internet.exampleEmail);
  });

  $('body').on('click', '.add-client-note', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $(event.target)
      .closest('.client-detail-card')
      .data('id');
    modal.open({ content: 'add-note' });
    $('#note-add-submit').attr('data-id', `${clientId}`);
  });

  $('body').on('submit', '.note-add-form', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $('#note-add-submit').attr('data-id');
    const newNote = {
      description: $('#note-description').val(),
      noteBody: $('#note-noteBody').val(),
    };
    requestAddNote(clientId, newNote);
    modal.close();
  });

  $('body').on('click', '.delete-note', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const clientId = $(event.target)
      .closest('.client-detail-card')
      .data('id');
    const noteId = $(event.target)
      .closest('.note-card')
      .data('id');
    requestDeleteNote(clientId, noteId);
  });

  $('body').on('click', '.edit-note', (event) => {
    event.preventDefault();
    event.stopPropagation();
    // note-card
    const $descriptionElement = $(event.target)
      .parent()
      .siblings()
      .find('.note-description');
    const $noteBodyElement = $(event.target)
      .parent()
      .siblings()
      .find('.note-body');
    const $descriptionInput = $('<input class="note-description-input" type="text"/>').val(
      $descriptionElement.text(),
    );
    const $bodyInput = $('<input class="note-body-input" type="text"/>').val(
      $noteBodyElement.text(),
    );
    $descriptionElement.replaceWith($descriptionInput);
    $noteBodyElement.replaceWith($bodyInput);
    $(event.target)
      .siblings('.save-note')
      .removeClass('hidden');
    $(event.target).addClass('hidden');
  });

  $('body').on('click', '.save-note', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const noteId = $(event.target)
      .closest('.note-card')
      .data('id');
    const updatedNote = {
      id: noteId,
      description: $(event.target)
        .parent()
        .siblings()
        .find('.note-description-input')
        .val(),
      noteBody: $(event.target)
        .parent()
        .siblings()
        .find('.note-body-input')
        .val(),
    };
    requestUpdateNote(noteId, updatedNote);
    $(event.target)
      .siblings('.edit-note')
      .removeClass('hidden');
    $(event.target).addClass('hidden');
  });
}

$(() => {
  addAllEventHandlers();
  checkForAuth();
});
