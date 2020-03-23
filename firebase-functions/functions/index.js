const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbauth");

const { addExpense } = require("./handlers/expenses");
const { getAllFinances, postOneFinance } = require("./handlers/finances");
const { signup, login } = require("./handlers/users");

app.get("/finances", getAllFinances);
app.post("/finance", FBAuth, postOneFinance);

app.post("/expenses", FBAuth, addExpense);

//signup route
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("europe-west2").https.onRequest(app);