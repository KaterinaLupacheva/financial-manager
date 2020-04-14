const { admin, db } = require("../util/admin");

exports.addExpenses = (req, res) => {
  const data = {
    docId: req.body.docId,
    date: req.body.date,
    newExpense: {
      id: req.body.id,
      date: req.body.expenseDate,
      sum: req.body.sum,
      details: req.body.details,
      category: req.body.category,
    },
  };

  let docPath = `${req.user.email}_${data.docId}`;

  db.collection("data")
    .doc(docPath)
    .set(
      {
        date: data.date,
        email: req.user.email,
        expenses: admin.firestore.FieldValue.arrayUnion(data.newExpense),
      },
      { merge: true }
    )
    .then(() => {
      return res.json({ message: "Expenses added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.addIncomes = (req, res) => {
  const data = {
    docId: req.body.docId,
    date: req.body.date,
    newIncome: {
      id: req.body.id,
      date: req.body.incomeDate,
      sum: req.body.sum,
      details: req.body.details,
      category: req.body.category,
    },
  };

  let docPath = `${req.user.email}_${data.docId}`;

  db.collection("data")
    .doc(docPath)
    .set(
      {
        date: data.date,
        email: req.user.email,
        incomes: admin.firestore.FieldValue.arrayUnion(data.newIncome),
      },
      { merge: true }
    )
    .then(() => {
      return res.json({ message: "Income added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getMonthData = (req, res) => {
  let monthData = {};
  let docPath = `${req.user.email}_${req.params.month}`;
  db.doc(`/data/${docPath}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Data not found" });
      }
      monthData = doc.data();
      monthData.docId = doc.id;
      return res.json(monthData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
