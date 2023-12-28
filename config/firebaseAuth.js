const firebaseAuth = require("firebase-admin");
firebaseAuth.initializeApp({
  credential: firebaseAuth.credential.cert({
    clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
    privateKey:process.env.FIREBASE_PRIVATE_KEY,
    projectId:process.env.FIREBASE_PROJECT_ID,
    "type": process.env ,
    "project_id":  process.env.FIREBASE_TYPE ,
    "private_key_id": process.env.FIREBASE_PROJECT_ID ,
    "private_key": process.env.FIREBASE_PRIVATE_KEY_ID
    ,
    "client_email": process.env.FIREBASE_PRIVATE_KEY ,
    "client_id":  process.env.FIREBASE_CLIENT_EMAIL ,
    "auth_uri":  process.env.FIREBASE_CLIENT_ID,
    "token_uri":  process.env.FIREBASE_AUTH_URL ,
    "auth_provider_x509_cert_url":  process.env.FIREBASE_AUTH_PROVIDER_CERT_URL ,
    "client_x509_cert_url": process.env.FIREBASE_CLIENT_CERT_URL ,
    "universe_domain":  process.env.FIREBASE_UNIVERSE_DOMAIN ,
  })
});

module.exports = firebaseAuth;