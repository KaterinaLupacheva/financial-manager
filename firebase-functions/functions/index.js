const functions = require("firebase-functions");
const app = require("express")();

const FBAuth = require("./util/fbauth");

const cors = require("cors");
app.use(cors());

const {
  addExpense,
  getAllExpensesByUser,
  getAllExpensesForPeriod,
  updateExpenseEntry,
  deleteExpenseEntry,
} = require("./handlers/expenses");

const {
  addIncome,
  getAllIncomesByUser,
  getAllIncomesForPeriod,
  updateIncomeEntry,
  deleteIncomeEntry,
} = require("./handlers/incomes");

const {
  signup,
  login,
  addUserDetails,
  getUserDetails,
} = require("./handlers/users");

const { addExpenses, addIncomes } = require("./handlers/data");

// app.post("/expenses", FBAuth, addExpense);
app.get("/expenses", FBAuth, getAllExpensesByUser);
app.get("/expenses/:startDate/:endDate", FBAuth, getAllExpensesForPeriod);
app.put("/expenses/:expenseId", FBAuth, updateExpenseEntry);
app.delete("/expenses/:expenseId", FBAuth, deleteExpenseEntry);

// app.post("/incomes", FBAuth, addIncome);
app.get("/incomes", FBAuth, getAllIncomesByUser);
app.get("/incomes/:startDate/:endDate", FBAuth, getAllIncomesForPeriod);
app.put("/incomes/:incomeId", FBAuth, updateIncomeEntry);
app.delete("/incomes/:incomeId", FBAuth, deleteIncomeEntry);

app.post("/expenses", FBAuth, addExpenses);
app.post("/incomes", FBAuth, addIncomes);

//signup route
app.post("/signup", signup);
app.post("/login", login);

app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getUserDetails);

exports.api = functions.region("europe-west2").https.onRequest(app);
