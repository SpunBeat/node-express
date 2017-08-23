'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'DATA_BACKEND',
    'SECRET_KEY',
    'INSTANCE_CONNECTION_NAME',
    'MONGO_URL',
    'MONGO_COLLECTION',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'NODE_ENV',
    'PORT'
  ])
  // 3. Config file
  .file({
    file: path.join(__dirname, 'config.json')
  })
  // 4. Defaults
  .defaults({
    SECRET_KEY: 'N0D3-3XPR355',
    DATA_BACKEND: 'mongodb',
    MONGO_URL: 'mongodb://localhost:27017',
    MONGO_COLLECTION: 'starter',
    MYSQL_USER: '',
    MYSQL_PASSWORD: '',
    PORT: 8080
  });
if (nconf.get('DATA_BACKEND') === 'mongodb') {
  checkConfig('MONGO_URL');
  checkConfig('MONGO_COLLECTION');
}
function checkConfig(setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}
