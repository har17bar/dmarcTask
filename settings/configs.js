const EnvPath = process.env.NODE_ENV ? ['.env', process.env.NODE_ENV].join('.') : '.env.dev';
console.log(`settings/${EnvPath}`);
require('dotenv').config({path: `settings/${EnvPath}`});
module.exports = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT
}
