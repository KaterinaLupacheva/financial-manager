const firestoreService = require("firestore-export-import");
const serviceAccount = require("./financial-manager.json");

const { databaseURL } = require("./databaseURL");

firestoreService.initializeApp(serviceAccount, databaseURL);

firestoreService.restore("data.json");
