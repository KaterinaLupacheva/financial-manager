export const createDataObject = (sheetsData) => {
    const transformedData = transformSheetsData(sheetsData);
    const sumPerDay = countDaySum(transformedData);
    const combinedArrays = combineArrays(sumPerDay, transformedData);
    return combinedArrays;
};

const transformSheetsData = sheetsData => {
    let result = [];
    let tempDate;
    sheetsData.forEach(arr => {
        tempDate = arr[0] ? arr[0] : tempDate;
        let parts = tempDate.split('.');
        const tempObj = {
            date: `${parts[2]}-${parts[1]}-${parts[0]}`,
            sum: arr[1],
            expenses: arr[2],
            category: arr[3],
        };
        result.push(tempObj);
    });
    return result;
};

const countDaySum = (monthData) => {
    const sumPerDay = monthData.reduce((acc, cur) => {
        acc[cur.date] = acc[cur.date] + parseFloat(cur.sum) || parseFloat(cur.sum);
        return acc;
    }, {});
    return sumPerDay;
};

const combineArrays = (sumPerDay, monthData) => {
    const result = [];
    let id = 1;
    let parentId = 0;
    for (let [key, value] of Object.entries(sumPerDay)) {
        result.push({
            id: id,
            date: key,
            sum: value.toFixed(2),
            expenses: '',
            category: ''
        });
        parentId = id;
        id++;
        
        monthData.forEach(dayObj => {            
            if(key === dayObj.date) {
                result.push({
                    id: id,
                    ...dayObj,
                    parentId: parentId
                });
                id++;
            }
        })
    };
    return result;
};
