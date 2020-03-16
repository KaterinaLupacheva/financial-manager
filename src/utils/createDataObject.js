export const createDataObject = (sheetsData) => {
    let result = [];
    let tempDate;
    sheetsData.forEach(arr => {
        tempDate = arr[0] ? arr[0] : tempDate;
        let parts = tempDate.split('.');
        const tempObj = {
            date: `${parts[2]}-${parts[1]}-${parts[0]}`,
            sum: arr[1],
            expenses: arr[2],
            category: arr[3]
        };
        result.push(tempObj);
    });
    return result;
}