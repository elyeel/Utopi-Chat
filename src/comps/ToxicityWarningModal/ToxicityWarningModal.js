import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './ToxicityWarningModal.scss';

export default function ToxicityWarningModal({isOpen, closeModal}) {
  const handleClose = () => {
    closeModal();
  }

  return (
    <div>
      <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Toxic Speech Detected'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-descriptin'>
          The <a target='_blank' href='https://github.com/tensorflow/tfjs-models/tree/master/toxicity'>machine learning algorithms</a> we use detected toxic meaning in your message. Your message will not be sent. Try wording things differently.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autofocus>
          Got It
        </Button>
      </DialogActions>
      </Dialog>
    </div>
  )
}