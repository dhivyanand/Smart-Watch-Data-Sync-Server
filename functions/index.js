const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

 exports.test_add = functions.https.onRequest((request, response) => {
  
    var docRef = db.collection('admin').doc('a');

    var setAda = docRef.set({
        req: "hello world"
    });

    response.send("Added \"Hello World\" as a data to firestore");
 });
