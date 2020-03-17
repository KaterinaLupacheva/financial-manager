import React from 'react';
import MaterialTable from "material-table";

const Table = ({dayData}) => {

    return(
        <MaterialTable
            title="Expenses"
            columns={[
                {title: 'Date', field: 'date'},
                {title: 'Sum', field: 'sum'},
                {title: 'Expenses', field: 'expenses'},
                {title: 'Category', field: 'category'}
            ]}
            data={dayData}
            parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
            options={{
                search: false,
                paging: false
              }}
        />
    )
};

export default Table;