export const createDataObject = (sheetsData) => {
    let result = [];
    let tempDate;
    sheetsData.forEach(arr => {
        tempDate = arr[0] ? arr[0] : tempDate;
        const tempObj = {
            date: tempDate,
            sum: arr[1],
            expenses: arr[2],
            category: arr[3]
        };
        result.push(tempObj);
    });
    return result;
}