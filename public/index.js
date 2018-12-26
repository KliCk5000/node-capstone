function displayClients(data) {
  data.forEach(element => {
    let clientString = ''
    Object.entries(element).forEach(([key, value]) => {
      clientString += `<p><strong>${key}:</strong> ${value}</p>`
    })
    $('body').append(`${clientString}<br/>`)
  })
}

function getClients(callbackFunction) {
  fetch('/api/clients')
    .then(response => response.json())
    .then(responseJson => callbackFunction(responseJson))
}

function getAndDisplayClients() {
  getClients(displayClients)
}

$(() => {
  getAndDisplayClients()
})
