exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://KliCk:DBpass1@ds115214.mlab.com:15214/client-a-roo';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || 'mongodb://KliCk:DBpass1@ds143594.mlab.com:43594/client-a-roo-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'pizza';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
