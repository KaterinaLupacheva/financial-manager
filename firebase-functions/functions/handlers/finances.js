const { db } = require("../util/admin");

exports.getAllFinances = (req, res) => {
  db.collection("finances")
    .orderBy("date", "desc")
    .get()
    .then(data => {
      let finances = [];
      data.forEach(doc => {
        finances.push({
          financeId: doc.id,
          sum: doc.data().sum,
          details: doc.data().details,
          category: doc.data().category,
          type: doc.data().type,
          date: doc.data().date
        });
      });
      return res.json(finances);
    })
    .catch(err => console.error(err));
};

exports.postOneFinance = (req, res) => {
  const newFinance = {
    date: new Date().toISOString(),
    sum: req.body.sum,
    details: req.body.details,
    category: req.body.category,
    type: req.body.type,
    username: req.user.username
  };

  db.collection("finances")
    .add(newFinance)
    .then(doc => {
      res.json({ message: `document ${doc.id} created` });
    })
    .catch(err => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
    });
};
