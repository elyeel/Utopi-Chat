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

export default function FlagSelectionModal({isOpen, closeModal, language, setLanguage}) {
  const [newLanguage, setNewLanguage] = useState(language);
  const [languageMenuState, setLanguageMenuState] = useState(false);
  const flagDropdown = flags.map(flag => {
    return (
    <MenuItem key={flag.code} value={flag.code}>{flag.code} {flag.emoji}</MenuItem>
    )
  });

  const handleSubmit = () => {
    setLanguage(newLanguage);
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
              open={languageMenuState}
              onClose={()=>setLanguageMenuState(false)}
              onOpen={()=>setLanguageMenuState(true)}
              value={newLanguage}
              onChange={e=>setNewLanguage(e.target.value)}
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