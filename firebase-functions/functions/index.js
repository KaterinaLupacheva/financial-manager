const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

const config = {
    apiKey: "AIzaSyBNKoeVsWj8akc-XhAoB67axhgseHqulAM",
    authDomain: "financial-manager-271220.firebaseapp.com",
    databaseURL: "https://financial-manager-271220.firebaseio.com",
    projectId: "financial-manager-271220",
    storageBucket: "financial-manager-271220.appspot.com",
    messagingSenderId: "198479107313",
    appId: "1:198479107313:web:b578dd8aacec5f19a10550"
  };

const firebase = require('firebase');
firebase.initializeApp(config);

app.get('/finances', (req, res) => {
    admin
        .firestore()
        .collection('finances')
        .orderBy('date', 'desc')
        .get()
        .then((data) => {
            let finances = [];
            data.forEach(doc => {
                finances.push({
                    financeId: doc.id,
                    sum: doc.data().sum,
                    details: doc.data().details,
                    category: doc.data().category,
                    type: doc.data().type,
                    date: doc.data().date
                })
            });
            return res.json(finances);
        })
        .catch((err) => console.error(err)); 
});

app.post('/finance', (req, res) => {
    const newFinance = {
        date: new Date().toISOString(),
        sum: req.body.sum,
        details: req.body.details,
        category: req.body.category,
        type: req.body.type
    };

    admin
        .firestore()
        .collection('finances')
        .add(newFinance)
        .then((doc) => {
            res.json({ message: `document ${doc.id} created`})
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong'})
            console.error(err);
        });
});

//signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        username: req.body.username
    };

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
        return res.status(201).json({ message: `user ${data.user.uid} signup`})
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code})
    });
});


exports.api = functions.region('europe-west2').https.onRequest(app);
