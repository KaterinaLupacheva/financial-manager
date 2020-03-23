export const dataToFirestore = data => {
  let tempData = [];
  data.forEach(d => {
    if (d.category !== "") {
      const tempDay = {
        date: d.date,
        sum: d.sum,
        details: d.expenses,
        category: d.category,
        username: "dlel"
      };
      tempData.push(tempDay);
    }
  });

  console.log(JSON.stringify(tempData, null, 2));
};
