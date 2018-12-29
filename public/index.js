function displayClients(data) {
  let clientListHTML = '';
  data.forEach((element) => {
    clientListHTML += `<p><strong>Name:</strong> ${element.firstName} ${element.lastName}</p>`;
    clientListHTML += `<p><strong>Phone:</strong> ${element.phoneNumber}</p>`;
    clientListHTML += `<p><strong>Email:</strong> ${element.email}</p>`;
    clientListHTML += `<input type="button" class="delete-client" id="${
      element._id
    }" value="delete">`;
    console.log(element);
    // NOTE: This code shows all key value pairs instead
    // Object.entries(element).forEach(([key, value]) => {
    //   clientString += `<p><strong>${key}:</strong> ${value}</p>`;
    // });
  });
  $('.client-list').html(`<div class="client">${clientListHTML}</div><br/>`);
}

function displayClientModification() {
  // $('.client-add').append
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
    .then(getAndDisplayClients());
}

// function addEventHandlersToButtons() {}

$(() => {
  displayClientModification();
  getAndDisplayClients();
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
});
