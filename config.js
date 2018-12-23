"use strict";
exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb://KliCk:DBpass1@ds115214.mlab.com:15214/client-a-roo";
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || "mongodb://localhost/test-client-a-roo";
exports.PORT = process.env.PORT || 8080;