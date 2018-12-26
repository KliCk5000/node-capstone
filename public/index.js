function displayClients(data) {
  data.forEach(element => {
    $('body').append(
      ` <h2>${element.id}</h2>
        <p>${element.firstName}</p>
      `
    )
  })
}

function getClients(callbackFunction) {
  fetch('http://localhost:8080/clients')
    .then(response => response.json())
    .then(responseJson => callbackFunction(responseJson))
}

function getAndDisplayClients() {
  getClients(displayClients)
}

$(() => {
  getAndDisplayClients()
})
