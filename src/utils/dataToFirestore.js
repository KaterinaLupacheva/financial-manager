import axios from "axios";
import { format } from "date-fns";

export const dataToFirestore = data => {
  let tempData = [];
  data.forEach(d => {
    if (d.category !== "") {
      const tempDate = d.date.split("-");
      const year = tempDate[0];
      const month = tempDate[1] - 1;
      const day = tempDate[2];

      const tempDay = {
        date: new Date(year, month, day, 8),
        sum: d.sum,
        details: d.expenses,
        category: d.category,
        email: "kat@tut.by"
      };

      // setTimeout(() =>
      //   axios.post('/expenses', tempDay)
      //   .then(res => {
      //     console.log(res.data)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   }), 2000);

      tempData.push(tempDay);
    }
  });

  console.log(JSON.stringify(tempData, null, 2));
};

const saveExpense = expense => {
  axios
    .post(
      "http://localhost:5000/financial-manager-271220/us-central1/api/expenses/",
      expense
    )
    .then(res => {
      console.log("Saved");
    })
    .catch(err => {
      console.log("Error " + err);
    });
};

const saveIncome = income => {
  axios
    .post(
      "http://localhost:5000/financial-manager-271220/us-central1/api/incomes/",
      income
    )
    .then(res => {
      console.log("Saved");
    })
    .catch(err => {
      console.log("Error " + err);
    });
};

export const newExpensesDataToFirestore = data => {
  let result = [];
  data.reverse().forEach(d => {
    const tempDate = d.date.split("-");
    const year = tempDate[0];
    const month = tempDate[1] - 1;

    result.push({
      docId: format(new Date(year, month, 1, 8), "MMM-yyyy"),
      date: new Date(year, month, 1, 8),
      id: d.expenseId,
      expenseDate: d.date,
      sum: d.sum,
      details: d.details,
      category: d.category
    });
  });

  let index = -1;
  let intervalId = setInterval(() => {
    ++index;
    if (index <= result.length) {
      saveExpense(result[index]);
    }
  }, 3000);

  if (index > result.length) {
    clearInterval(intervalId);
  }
};

export const newIncomeDataToFirestore = data => {
  let result = [];
  data.reverse().forEach(d => {
    const tempDate = d.date.split("-");
    const year = tempDate[0];
    const month = tempDate[1] - 1;

    result.push({
      docId: format(new Date(year, month, 1, 8), "MMM-yyyy"),
      date: new Date(year, month, 1, 8),
      id: d.incomeId,
      incomeDate: d.date,
      sum: d.sum,
      details: d.details,
      category: d.category
    });
  });

  let index = -1;
  let intervalId = setInterval(() => {
    ++index;
    if (index <= result.length) {
      saveIncome(result[index]);
    }
  }, 3000);

  if (index > result.length) {
    clearInterval(intervalId);
  }
};
