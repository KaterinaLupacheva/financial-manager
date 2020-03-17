import React from 'react';
import MaterialTable from "material-table";

const Table = ({monthData, isExpenses}) => {
    const name = isExpenses ? 'Expenses' : 'Income';
    return(
        <MaterialTable
            title={`${name} ${monthData.totalMonthSum.toFixed(2)}`}
            columns={[
                {title: 'Date', field: 'date'},
                {title: 'Sum', field: 'sum'},
                {title: `${name}`, field: 'expenses'},
                {title: 'Category', field: 'category'}
            ]}
            data={monthData.combinedArrays}
            parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
            options={{
                search: false,
                paging: false,
                headerStyle: {
                    backgroundColor: '#01579b',
                    color: '#FFF',
                    fontWeight: 'bold'
                  }
              }}
        />
    )
};

export default Table;