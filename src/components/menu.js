import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SimpleTable from "./table";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { REG_NUMBER_PHONE, UPDATE, SUBSCIBE } from "./../consts/";
import CircularProgress from "@material-ui/core/CircularProgress";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    opacity: 1,
  },
  cusButton: {},
  tabPanel: {
    textAlign: "left",
  },
  loading: {
    position: "absolute",
    top: 400,
    left: 600,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({id: '', fname:'', fnumber: ''});
  const [editing, setEditing] = React.useState(false);


  // Change componentDidmount
  useEffect(() => {
    let lst = localStorage.getItem("lst");
    if (!lst) {
      setData([]);
      return;
    }
    lst = JSON.parse(lst);
    setData(lst.data);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = (e) => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    if(!editing){
      setEditing(true);
      setUser({id:'', fname:'', fnumber :''});
      setOpen(true);
    }
    setOpen(true);
    setEditing(false);
  };
  const onSubmit = (value) => {
        //update
    if(value.id){
      let lstStore = localStorage.getItem("lst");
      lstStore = JSON.parse(lstStore);
      const index = _.findIndex(lstStore.data, (item) => {
        return item.id === value.id;
      });
      let data = [
        ...lstStore.data.slice(0, index),
        {
          id : value.id,
          fname: value.fname,
          fnumber: value.fnumber
        },
        ...lstStore.data.slice(index + 1),
      ];
      setData(data);
      localStorage.setItem("lst", JSON.stringify({ data }));
      handleClose();
    }else{
    // insert
    value.id = uuidv4();
    let data = [];
    let lstStore = localStorage.getItem("lst");
    if (!lstStore) {
      data.push(value);
      setData(data);
      localStorage.setItem("lst", JSON.stringify({ data }));
      handleClose();
    }
    lstStore = JSON.parse(lstStore);
    data = lstStore.data;
    data.push(value);
    setData(data);
    localStorage.setItem("lst", JSON.stringify({ data }));
    handleClose();
    }
  };

  const onDelete = (id) => {
    setLoading(true);
    setTimeout(() => {
      let lstStore = localStorage.getItem("lst");
      if (!lstStore) {
        return;
      }
      lstStore = JSON.parse(lstStore);
      const index = _.findIndex(lstStore.data, (item) => {
        return item.id === id;
      });
      let data = [
        ...lstStore.data.slice(0, index),
        ...lstStore.data.slice(index + 1),
      ];
      setData(data);
      localStorage.setItem("lst", JSON.stringify({ data }));
      setLoading(false);
    }, 2000);
  };

  const onEdit = (id) => {
    handleClickOpen();
    let lstStore = localStorage.getItem("lst");
      if (!lstStore) {
        return;
      }
      lstStore = JSON.parse(lstStore);
      const index = _.findIndex(lstStore.data, (item) => {
        return item.id === id;
      });
      setUser(lstStore.data[index]);

  };
  return (
    <div className={classes.root}>
      {loading ? <CircularProgress className={classes.loading} /> : ""}
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Insert" {...a11yProps(1)} />
          <Tab label="Contact" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.tabPanel} value={value} index={0}>
        <Button
          className={classes.cusButton}
          variant="contained"
          color="primary"
          href="#contained-buttons"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title"> { user.id ? UPDATE : SUBSCIBE }</DialogTitle>
          <Formik
            initialValues={{ id:user.id, fname:user.fname, fnumber :user.fnumber }}
            onSubmit={ onSubmit }
            validationSchema={Yup.object().shape({
              fname: Yup.string()
                .min(5, "Too Short!")
                .max(50, "Too Long!")
                .required("Required Name ")
                .trim(),
              fnumber: Yup.string()
                .required("Required Number")
                .matches(REG_NUMBER_PHONE, "Phone number is not valid"),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <DialogContent>
                    <TextField
                      error={errors.fname && touched.fname}
                      autoFocus
                      margin="dense"
                      id="fname"
                      label="Name"
                      name="fname"
                      fullWidth
                      value={values.fname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorText={errors.fname}
                      helperText={errors.fname && touched.fname && errors.fname}
                    />
                    <TextField
                      margin="dense"
                      id="fnumber"
                      label="Number Phone"
                      name="fnumber"
                      fullWidth
                      value={values.fnumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.fnumber && touched.fnumber && errors.fnumber
                      }
                      error={errors.fnumber && touched.fnumber}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      // onClick={handleClose}
                      color="primary"
                      disabled={isSubmitting}
                    >
                      { user.id ? UPDATE : SUBSCIBE}
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
            {/* </form>
          </Formik> */}
          </Formik>
        </Dialog>
        {/* { editing ? <FormEdit user = {user}/> : ''} */}
        <SimpleTable
          lst={data ? data : []}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <SimpleTable lst={lst} /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* <SimpleTable /> */}
      </TabPanel>
    </div>
  );
}
