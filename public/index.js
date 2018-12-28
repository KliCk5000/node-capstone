function displayClients(data) {
  data.forEach((element) => {
    let clientString = '';
    clientString = `<p><strong>Name:</strong> ${element.firstName} ${element.lastName}</p>`;
    console.log(element);
    // NOTE: This code shows all key value pairs instead
    // Object.entries(element).forEach(([key, value]) => {
    //   clientString += `<p><strong>${key}:</strong> ${value}</p>`;
    // });
    $('.client-list').append(`<div class="client">${clientString}</div><br/>`);
  });
}

function getClients(callbackFunction) {
  fetch('/api/clients')
    .then(response => response.json())
    .then(responseJson => callbackFunction(responseJson));
}

function getAndDisplayClients() {
  getClients(displayClients);
}

$(() => {
  getAndDisplayClients();
});
