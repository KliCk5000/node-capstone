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
      if (response.statusText === 'Unauthorized') {
        $('.login-error').text('Invalid username or password');
        throw new Error('Invalid username or password');
      }
    })
    .then((responseJson) => {
      localStorage.setItem('authToken', responseJson.authToken);
      displayAllClientsScreen();
    })
    .catch(error => console.error(error));
}

function signUpUser(newUser) {
  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (response.ok) {
        $('.login-success').text('Sign-up successful! Please Log in');
        displayLoginScreen();
      }
      return response.json();
    })
    .then((responseJson) => {
      if (responseJson.type === 'error') {
        throw new Error(`${responseJson.reason} - ${responseJson.message} for ${responseJson.location}.`);
      }
    })
    .catch((error) => {
      console.error(error);
      $('.signup-error').text(`${error}`);
    });
}

function logoutUser() {
  localStorage.clear();
  $('.client-list').empty();
  $('.client-list').off();
  checkForAuth();
}
