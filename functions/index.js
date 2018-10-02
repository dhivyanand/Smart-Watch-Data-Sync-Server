const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.database();

var ref = db.ref("Smart Watch/User");

 exports.registration = functions.https.onRequest((request, response) => {
  
    var uname = request.body.uname;
    var password = request.body.password;
    var emails = request.body.email;

    ref.once('value', function(snapshot) {
       
        if (snapshot.hasChild(emails)) {
          response.send('#already available')
        }else{
              
          ref.update({[emails]:{
                            "healthInfo":{
                                "calories_burned":"10"
                                },
                            "profile":{
                                "name":uname,
                                "password":password
                                }
                         }
                     })   
          response.send('#savng') 
        }
        
    })


});

 exports.login = functions.https.onRequest((request, response) => {

    var id = request.body.id;
    var password = request.body.password;
 
 });

 exports.testFunc = functions.https.onRequest((request, response) => {
      

 });