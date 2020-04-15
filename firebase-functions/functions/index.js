const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbauth");

const cors = require("cors");
app.use(cors());

const {
  signup,
  login,
  addUserDetails,
  getUserDetails
} = require("./handlers/users");

const {
  addExpenses,
  addIncomes,
  getMonthData,
  updateMonthData,
  getPeriodData
} = require("./handlers/data");

//new routes
app.post("/expenses", FBAuth, addExpenses);
app.post("/incomes", FBAuth, addIncomes);
app.get("/month/:month", FBAuth, getMonthData);
app.put("/month/:month", FBAuth, updateMonthData);
app.get("/data/:startMonth/:endMonth", FBAuth, getPeriodData);

//signup route
app.post("/signup", signup);
app.post("/login", login);

app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getUserDetails);

exports.api = functions.region("europe-west2").https.onRequest(app);
