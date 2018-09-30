const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.database();

var ref = db.ref("Smart Watch/User");

function check_entry(entry){

    ref.once('value', function(snapshot) {
        if (snapshot.hasChild(entry)) {
          
        }else{
            
        }
        
    });

}

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


    ref.once('value', function(snapshot) {
        if (snapshot.hasChild('email')) {
          response.send('hello')
        }else
        response.send('sry')
      });

 });