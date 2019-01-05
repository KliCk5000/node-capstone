const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

// Change mongoose's promise to ES6
mongoose.Promise = global.Promise;

// Variables needed from configs.js
const { PORT, DATABASE_URL } = require('./config');

// Create the express app
const app = express();

// Set up routs
const User = require('./api/users-router');
const Client = require('./api/clients-router');
const { router: authRouter } = require('./api/auth-router');
const { localStrategy, jwtStrategy } = require('./api/auth-strategies');

passport.use(localStrategy);
passport.use(jwtStrategy);

// Let express know to grab files from public folder
app.use(morgan('common')); // Our server logger
app.use(express.json());
app.use(express.static('public'));
app.use('/api/users', User);
app.use('/api/auth', authRouter);
app.use('/api/clients', Client);

const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => res.json({
  data: 'pizza',
}));

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  const options = { useCreateIndex: true, useNewUrlParser: true };
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      options,
      (err) => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            return resolve();
          })
          .on('error', (error) => {
            mongoose.disconnect();
            return reject(error);
          });
      },
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(
    () => new Promise((resolve, reject) => {
      console.log('Closing Server');
      server.close((error) => {
        if (error) {
          return reject(error);
        }
        return resolve();
      });
    }),
  );
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(error => console.error(error));
}

module.exports = {
  app,
  runServer,
  closeServer,
};
