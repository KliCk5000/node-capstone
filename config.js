exports.DATABASE_URL = process.env.DATABASE_URL 
  || 'mongodb+srv://klick:31NmWh22yteofW9W@yokaidb.75kyb.mongodb.net/clientaroo?retryWrites=true&w=majority'
  //'mongodb://an-clientaroo:tIGkFYLmcs6RlSFsvTSxNUqZIdRlMPZM1ahLvwOAd8aO1FmPDLbQpDEsz2iDNiCwDCJTTq2XToOgCymdxHwQXA%3D%3D@an-clientaroo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@an-clientaroo@';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL
  || 'mongodb+srv://klick:31NmWh22yteofW9W@yokaidb.75kyb.mongodb.net/clientaroo?retryWrites=true&w=majority'
  //'mongodb://an-clientaroo:tIGkFYLmcs6RlSFsvTSxNUqZIdRlMPZM1ahLvwOAd8aO1FmPDLbQpDEsz2iDNiCwDCJTTq2XToOgCymdxHwQXA%3D%3D@an-clientaroo.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@an-clientaroo@';
exports.PORT = process.env.PORT || 8080;
exports.TEST_PORT = 8090;
exports.JWT_SECRET = process.env.JWT_SECRET || 'pizza';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
