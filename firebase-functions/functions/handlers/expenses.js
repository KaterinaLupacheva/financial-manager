const { db } = require("../util/admin");

const { reduceEntry } = require("../util/validators");

exports.addExpense = (req, res) => {
  const newExpense = {
    date: new Date().toISOString(),
    sum: req.body.sum,
    details: req.body.details,
    category: req.body.category,
    username: req.user.username
  };

  db.collection("expenses")
    .add(newExpense)
    .then(doc => {
      res.json({ message: `document ${doc.id} created` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

exports.getAllExpensesByUser = (req, res) => {
  db.collection("expenses")
    .where("username", "==", req.user.username)
    .orderBy("date", "desc")
    .get()
    .then(data => {
      let expenses = [];
      data.forEach(doc => {
        expenses.push({
          expenseId: doc.id,
          sum: doc.data().sum,
          details: doc.data().details,
          category: doc.data().category,
          date: doc.data().date
        });
      });
      return res.json(expenses);
    })
    .catch(err => console.error(err));
};

exports.updateExpenseEntry = (req, res) => {
  let entryDetails = reduceEntry(req.body);

  db.doc(`/expenses/${req.params.expenseId}`)
    .update(entryDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};