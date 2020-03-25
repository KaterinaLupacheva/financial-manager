const { db } = require("../util/admin");

const { reduceEntry } = require("../util/validators");

exports.addExpense = (req, res) => {
  const newExpense = {
    date: req.body.date,
    sum: req.body.sum,
    details: req.body.details,
    category: req.body.category,
    email: req.user.email
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
    .where("email", "==", req.user.email)
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

exports.getAllExpensesByMonth = (req, res) => {
  db.collection("expenses")
    .where("email", "==", req.user.email)
    .where("date")
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

exports.deleteExpenseEntry = (req, res) => {
  const document = db.doc(`/expenses/${req.params.expenseId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Entry not found" });
      }
      if (doc.data().email !== req.user.email) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Entry deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
