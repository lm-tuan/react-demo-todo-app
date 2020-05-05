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
import Card from '@material-ui/core/Card';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from '@material-ui/core/DialogContentText';
const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  cusButton: {}
});


export default function SimpleTable(props) {

  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = e => {
    setOpenModal(false);
  };
  // const handleClickOpenModal = () => {
  //   setOpenModal(true);
  // };
  const onProcessDeleteAndOpenMoal = (id) => {
    setOpenModal(true);
    props.onDelete(id);
  }
  const classes = useStyles();
  const rows = props.lst ? props.lst : [];
  return (
    <Card>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">NumberPhone</TableCell>
              <TableCell align="right">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows.length === 0 ? '' : 
              rows?.map(row => (
                <TableRow key={row?.id}>
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
                        <Button onClick = { ()=> props.onEdit(row.id)}>Edit</Button>
                        <Button color="secondary" onClick = {() =>onProcessDeleteAndOpenMoal(row.id)}>Delete</Button>
                      </ButtonGroup>
                    </ButtonGroup>
                    <Dialog
                      open={openModal}
                      onClose={handleCloseModal}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Let Google help apps determine location. This means sending anonymous location data to
                          Google, even when no apps are running.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                          YES
                        </Button>
                        <Button onClick={handleCloseModal} color="primary" autoFocus>
                          NO
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
