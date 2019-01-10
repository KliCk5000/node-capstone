/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
function checkForAuth() {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    displayAllClientsScreen();
  } else {
    displayLoginScreen();
  }
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
      throw new Error(response);
    })
    .then((responseJson) => {
      localStorage.setItem('authToken', responseJson.authToken);
      displayAllClientsScreen();
    })
    .catch(error => $('.login-error').text(`${error}`));
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
      $('.login-success').text('Sign-up successful! Please Log in');
      displayLoginScreen();
    })
    .catch((error) => {
      console.log(error);
      $('.signup-error').text(`${error}`);
    });
}

function logoutUser() {
  localStorage.clear();
  $('.client-list').empty();
  checkForAuth();
}
