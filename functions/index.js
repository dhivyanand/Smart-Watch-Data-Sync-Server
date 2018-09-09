const functions = require('firebase-functions');

 exports.sw = functions.https.onRequest((request, response) => {
  response.send("Welcome to Smart Watch Data Sync.");
 });
