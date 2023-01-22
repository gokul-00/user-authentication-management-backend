// config/keys.js
require('dotenv').config({path:__dirname+'./../.env'})

module.exports = {
    secret: process.env.SECRET,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
};
  