import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LanguageIcon from "@material-ui/icons/Language";


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './FlagSelectionModal.scss';
import flags from '../flags';

export default function FlagSelectionModal({isOpen, closeModal, db, cookies}) {
  const [flag, setFlag] = useState('');
  const [flagMenuState, setFlagMenuState] = useState(false);
  const flagDropdown = flags.map(flag => {
    return (
    <MenuItem key={flag.code} value={flag.code}>{flag.code} {flag.emoji}</MenuItem>
    )
  });

  const handleSubmit = () => {
    if (flag) {
      db.collection("users")
        .doc(cookies.user.id)
        .update({ flag_code: flag })
        .then(() => console.log("Users array updated"))
        .catch((error) => console.error("Error in updating", error));
      };
    }
    setFlag('');
    closeModal();
  }

  return (
    <div>
      <Dialog
      open={isOpen}
      onClose={handleSubmit}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      disableBackdropClick
      >
        <DialogTitle id='alert-dialog-title'>
          {/* <LanguageIcon/> */}
          <IconButton aria-label="close" onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <InputLabel id='open-select-label'>
              <LanguageIcon/>
            </InputLabel>
            <Select
              labelId='open-select-label'
              open={flagMenuState}
              onClose={()=>setFlagMenuState(false)}
              onOpen={()=>setFlagMenuState(true)}
              value={flag}
              onChange={e=>setFlag(e.target.value)}
            >
              <MenuItem value='none'><LanguageIcon/></MenuItem>
              {flagDropdown}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color='primary' autoFocus>
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}