/* eslint-disable no-use-before-define */
function checkForAuth() {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    displayAddClientArea();
  } else {
    displayLogin();
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
      console.log(response);
      throw new Error(response);
    })
    .then((responseJson) => {
      console.log(responseJson);
      localStorage.setItem('authToken', responseJson.authToken);
      displayAddClientArea()
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
      console.log(responseJson);
      $('.login-success').text('Sign-up successful! Please Log in');
      displayLogin();
    })
    .catch((error) => {
      console.log(error);
      $('.signup-error').text(`${error}`);
    });
}

function logoutUser() {
  localStorage.clear();
  checkForAuth();
}
