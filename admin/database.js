const admin = require('firebase-admin');
let serviceAccountKey = require('./config.json');

admin.initializeApp({
    credential : admin.credential.cert(serviceAccountKey),
    databaseURL : 'https://mself-1243c.firebaseio.com/'
});

module.exports = function(){
    return admin;
}