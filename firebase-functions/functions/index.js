const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbauth");

const cors = require("cors");
app.use(cors());

const {
  addExpense,
  getAllExpensesByUser,
  getAllExpensesByMonth,
  updateExpenseEntry,
  deleteExpenseEntry
} = require("./handlers/expenses");

const {
  addIncome,
  getAllIncomesByUser,
  updateIncomeEntry,
  deleteIncomeEntry
} = require("./handlers/incomes");

const { signup, login } = require("./handlers/users");

app.post("/expenses", FBAuth, addExpense);
app.get("/expenses", FBAuth, getAllExpensesByUser);
app.get("/expenses/:month", FBAuth, getAllExpensesByMonth);
app.put("/expenses/:expenseId", FBAuth, updateExpenseEntry);
app.delete("/expenses/:expenseId", FBAuth, deleteExpenseEntry);

app.post("/incomes", FBAuth, addIncome);
app.get("/incomes", FBAuth, getAllIncomesByUser);
app.put("/incomes/:incomeId", FBAuth, updateIncomeEntry);
app.delete("/incomes/:incomeId", FBAuth, deleteIncomeEntry);

//signup route
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("europe-west2").https.onRequest(app);
