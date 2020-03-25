import axios from "axios";

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
        category: d.category
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

  // console.log(JSON.stringify(tempData, null, 2));
};
