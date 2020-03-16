import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const DayView = ({dayData}) => {
    console.log(JSON.stringify(dayData))
    const classes = useStyles();

    const ccyFormat = (num) => {
       return `${num.toFixed(2)}`;
    };

    const total = (dayData) => {
        let sum = dayData.reduce((a,b) => {
            return a + parseFloat(b.sum) 
        }, 0);
        return sum;
      }

    return(
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Sum</TableCell>
            <TableCell align="center">Expenses</TableCell>
            <TableCell align="center">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dayData.map(row => (
            <TableRow key={row.sum}>
              <TableCell component="th" scope="row" align="center">
                {row.sum}
              </TableCell>
              <TableCell align="center">{row.expenses}</TableCell>
              <TableCell align="center">{row.category}</TableCell>
            </TableRow>
          ))}

        <TableRow>
            <TableCell>{`Total ${ccyFormat(total(dayData))}`}</TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    )
};

export default DayView;