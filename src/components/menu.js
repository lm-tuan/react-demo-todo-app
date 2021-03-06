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
import { REG_NUMBER_PHONE, UPDATE, SUBSCIBE } from "./../consts/";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {FetchAPi, InsertUser, DeleteUser, UserEditing, UserUpdate } from './../actions/'
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
    position: "fixed",
    top: '50%',
    left: '50%',
    zIndex:99,
    
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({id: '', fname:'', fnumber: ''});


  const datas = useSelector(state => state.users);
  const dispatch = useDispatch();

  // Change componentDidmount
  useEffect( () => {
    dispatch(FetchAPi.request());
    if(datas.editing && datas?.editing.id){
      setUser({id:datas.editing.id, fname:datas.editing.fname, fnumber :datas.editing.fnumber});
    }
  }, [datas.editing ]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = (e) => {
    setUser({id:'', fname:'', fnumber : ''});
    setOpen(false);
  };
  const handleClickOpen = () => {
    setUser({id:'', fname:'', fnumber : ''});
    setOpen(true);
  };
  const onSubmit = (value) => {
    if(value.id){
      dispatch(UserUpdate.request(value));
      setUser({id:'', fname:'', fnumber : ''});
      handleClose();
    }else{
      dispatch(InsertUser.request(value));
      handleClose();
    }
  };

  const onDelete = (id) => {
    dispatch(DeleteUser.request(id));
  };

 
  const onEdit = (id) => {
    handleClickOpen();
    dispatch(UserEditing.request(id));
  };
  return (
    <div className={classes.root}>
      { datas.loading ? <CircularProgress className={classes.loading} /> : ""}
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
          </Formik>
        </Dialog>
        <SimpleTable
          lst={datas.users ? datas.users : []}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
    </div>
  );
}
