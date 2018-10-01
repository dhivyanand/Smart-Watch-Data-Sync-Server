const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.database();

var ref = db.ref("Smart Watch/User");

function check_entry(entry){

    if(ref.once('value', function(snapshot) {
       
        if (snapshot.hasChild('email')) {
          return true;
        }else{
          return false;  
        }
        
    })){
     
        return true
    
    }else
        return false

}

 exports.registration = functions.https.onRequest((request, response) => {
  
    var uname = request.body.uname;
    var password = request.body.password;
    var emails = request.body.email;

    ref.once('value', function(snapshot) {
       
        if (snapshot.hasChild(emails)) {
          response.send('#already available')
        }else{

          //var req = '{emails:{healthInfo:{calories_burned:10},profile:{name:'+uname+',password:'+password+'}}}'
          
          var a = {[emails]:{
            "healthInfo":{
                "calories_burned":"10"
                },
            "profile":{
                "name":uname,
                "password":password
                }
          }}

         /* ref.update({emails:{
                            "healthInfo":{
                                "calories_burned":"10"
                                },
                            "profile":{
                                "name":uname,
                                "password":password
                                }
                         }
                     })   */
          ref.update(a)
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