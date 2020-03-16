import React from 'react';
import MaterialTable from "material-table";

const Table = ({dayData}) => {

    return(
        <MaterialTable
            title="Expenses"
            columns={[
                {title: 'Sum', field: 'sum'},
                {title: 'Expenses', field: 'expenses'},
                {title: 'Category', field: 'category'}
            ]}
            data={dayData}
        />
    )
};

export default Table;