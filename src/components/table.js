import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import _ from 'lodash';
import Detail from './detail';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cusButton: {},
});

export default function SimpleTable(props) {
  const [openModal, setOpenModal] = React.useState(false);
  const [item, setItem] = React.useState({id: '', fname:'', fnumber: ''});
  const classes = useStyles();
  const onDetail = (id) => {
    setOpenModal(!openModal);
    const index = _.findIndex(props.lst, (item) => {
      return item.id === id;
    });
    setItem(props.lst[index]);
  }

  const rows = props.lst ? props.lst : [];
  return (
    <Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>Index</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">NumberPhone</TableCell>
              <TableCell align="right">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0
              ? ""
              : rows?.map((row, index) => (
                  <TableRow onClick={ () => onDetail(row.id) } key={row?.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.fname}
                    </TableCell>
                    <TableCell align="right">{row?.fnumber}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        disableElevation
                        variant="contained"
                        color="primary"
                      >
                        <ButtonGroup
                          disableElevation
                          variant="contained"
                          color="primary"
                        >
                          <Button onClick={() => props.onEdit(row.id)}>
                            Edit
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => props.onDelete(row.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </ButtonGroup>
                    </TableCell>
                    {openModal ? <Detail item = {item} /> : '' }
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
