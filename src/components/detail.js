import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


export default function Detail(props) {
  const [openDetail, setOpenDetail] = React.useState(false);
  const datas = useSelector(state => state.users);
  
  const handleClose = () => {
    setOpenDetail(false);
    props.clickDetail(null, false);
  };
  useEffect(() => {
    if(props.status) {
      setOpenDetail(props.status);
    }
  }, [props.status])
  
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDetail}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Detail item
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Name :  {datas.editing.fname}
          </Typography>
          <Typography gutterBottom>
             Number Phone :  {datas.editing.fname}
          </Typography>
          <Typography gutterBottom>
            Description: Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}