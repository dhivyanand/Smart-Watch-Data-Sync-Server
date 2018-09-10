const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.database();

 exports.registration = functions.https.onRequest((request, response) => {
  
    var uname = request.body.uname;
    var password = request.body.password;
    var email = request.body.email;

 });

 exports.login = functions.https.onRequest((request, response) => {

    var id = request.body.id;
    var password = request.body.password;
 
 });

 exports.testFunc = functions.https.onRequest((request, response) => {


  var ref = db.ref("Sample");
  ref.set({test:"okay"});
  response.send('Functions working');


 });