const { db } = require("../util/admin");

const { reduceEntry } = require("../util/validators");

exports.addIncome = (req, res) => {
  const newIncome = {
    date: new Date().toISOString(),
    sum: req.body.sum,
    details: req.body.details,
    category: req.body.category,
    username: req.user.username
  };

  db.collection("incomes")
    .add(newIncome)
    .then(doc => {
      res.json({ message: `document ${doc.id} created` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};

exports.getAllIncomesByUser = (req, res) => {
  db.collection("incomes")
    .where("username", "==", req.user.username)
    .orderBy("date", "desc")
    .get()
    .then(data => {
      let incomes = [];
      data.forEach(doc => {
        incomes.push({
          incomeId: doc.id,
          sum: doc.data().sum,
          details: doc.data().details,
          category: doc.data().category,
          date: doc.data().date
        });
      });
      return res.json(incomes);
    })
    .catch(err => console.error(err));
};

exports.updateIncomeEntry = (req, res) => {
  let entryDetails = reduceEntry(req.body);

  db.doc(`/incomes/${req.params.incomeId}`)
    .update(entryDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteIncomeEntry = (req, res) => {
  const document = db.doc(`/incomes/${req.params.incomeId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Entry not found" });
      }
      if (doc.data().username !== req.user.username) {
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