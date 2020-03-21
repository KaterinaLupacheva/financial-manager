const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/finances', (req, res) => {
    admin
        .firestore()
        .collection('finances')
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
        date: admin.firestore.Timestamp.fromDate(new Date()),
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


exports.api = functions.https.onRequest(app);
