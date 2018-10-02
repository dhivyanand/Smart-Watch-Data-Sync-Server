const functions = require('firebase-functions');
const admin = require('firebase-admin');
const mail = require('nodemailer');

admin.initializeApp(functions.config().firebase);

var db = admin.database();

var ref = db.ref("Smart Watch/User");

function gen_OTP(id){

    g = ref.child(id+'/profile/')
    var random = Math.floor(100000 + Math.random() * 900000)
    g.update({otp:random})

}

exports.getOTP = functions.https.onRequest((request, response) => {

});

 exports.registration = functions.https.onRequest((request, response) => {
  
    var uname = request.body.uname;
    var password = request.body.password;
    var emails = request.body.email;

    ref.once('value', function(snapshot) {
       
        if (snapshot.hasChild(emails)) {
          response.send('#already_available')
        }else{
              
          ref.update({[emails]:{
                            "healthInfo":{
                                "calories_burned":0,
                                "light_active_distance":0,
                                "very_active_minutes":0,
                                "fair_active_minutes":0,
                                "light-active_minutes":0,
                                "sedentary_minutes":0,
                                },
                            "profile":{
                                "name":uname,
                                "password":password,
                                "flag":"zero",
                                "otp":null
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

    ref.once('value', function(snapshot) {
        if (snapshot.hasChild(id)) {
          
            r = ref.child(id.toString()+'/profile/password')

            f0 = ref.child(id+'/profile')
            f = f0.child('flag')
            
            r.once('value', function(data) {
                f.once('value', function(flag) {

                if(flag.val() == "Th"){

                    response.send('#enter_otp')
                    gen_OTP(id.toString())

                }else if (data.val() == password.toString()) {
                    response.send('#successful_login')
                }else{
                                   
                        if(flag.val() == "Ze"){
                            f0.update({flag:"On"})
                            response.send('#incorrect_password')
                        }
                        else if(flag.val() == "On"){
                            f0.update({flag:"Tw"})
                            response.send('#incorrect_password')
                        }
                        else if(flag.val() == "Tw"){
                            f0.update({flag:"Th"})
                            response.send('#enter_otp')
                            gen_OTP(id.toString())

                        } 

                    
                    }
                })

              });

        }else{
            response.send('#no_exist')
        }
      });
 
 });

 exports.testFunc = functions.https.onRequest((request, response) => {

    r = ref.child('abcd/profile')

    r.update({password:"abcd"})


 });