"use strict";
var MOCK_CLIENT_LIST = {
  clients: [
    {
      id: 111111,
      name: "David",
      company: "Walter, Rogahn and Kshlerin",
      address: "9452 Cathrine Street",
      phoneNumber: "(482) 611-0508 x500",
      email: "Katrina_Spinka56@hotmail.com",
      notes: "Facilis voluptatem sunt velit.",
      reminders: "Tempora neque est architecto natus."
    },
    {
      id: 222222,
      name: "Taurean",
      company: "Rowe, Douglas and Vandervort",
      address: "4826 Laury Stravenue",
      phoneNumber: "288.294.5966 x227",
      email: "Mable.Frami57@yahoo.com",
      notes: "Fugit ipsam quo iure sint nostrum similique.",
      reminders: "Maxime voluptatem neque natus sit vitae sed voluptas."
    },
    {
      id: 333333,
      name: "Esta",
      company: "Thiel - Ratke",
      address: "58349 Valentine River",
      phoneNumber: "1-122-270-0749 x9024",
      email: "Moshe.Lowe@gmail.com",
      notes: "Necessitatibus illum recusandae eum.",
      reminders: "Deleniti harum tempora quia."
    },
    {
      id: 444444,
      name: "Dayton",
      company: "Gusikowski, Ernser and Dooley",
      address: "0675 Nicolas Crescent",
      phoneNumber: "(957) 607-2807",
      email: "Claudia90@hotmail.com",
      notes: "Ut quidem consequuntur maiores facilis eum eaque quibusdam.",
      reminders: "Aut dolore quam adipisci fugit eos quos et sunt."
    },
    {
      id: 555555,
      name: "Tanner",
      company: "Jakubowski - Powlowski",
      address: "4410 Beahan Heights",
      phoneNumber: "980-440-0457 x1888",
      email: "Libbie.Ferry@hotmail.com",
      notes: "Molestiae eum a est amet qui.",
      reminders: "Aut commodi vitae."
    }
  ]
};

function getClients(callbackFunction) {
  setTimeout(function() {
    callbackFunction(MOCK_CLIENT_LIST);
  });
}

function displayClients(data) {
  for (let index in data.clients) {
    $("body").append(
      ` <h2>${data.clients[index].name}</h2>
        <p>${data.clients[index].company}</p>
        <p>${data.clients[index].address}</p>
        <p>${data.clients[index].phoneNumber}</p>
      `
    );
  }
}

function getAndDisplayClients() {
  getClients(displayClients);
}

$(function() {
  getAndDisplayClients();
});
