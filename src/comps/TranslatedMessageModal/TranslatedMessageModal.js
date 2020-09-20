import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import translate from '../../helpers/translate';


import './TranslatedMessageModal.scss';

export default function TranslatedMessageModal({isOpen, closeModal, message}) {
  const [language, setLanguage] = useState('none');
  const [languageMenuState, setLanguageMenuState] = useState(false);
  const [translation, setTranslation] = useState(message);
  const languages = {
    'ar': 'Arabic',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'bg': 'Bulgarian',
    'zh': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'et': 'Estonian',
    'fi': 'Finnish',
    'fr': 'French',
    'de': 'German',
    'el': 'Greek',
    'gu': 'Gujarati',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'hu': 'Hungarian',
    'ga': 'Irish',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'lv': 'Latvian',
    'lt': 'Lithuanian',
    'ms': 'Malay',
    'ml': 'Malayalam',
    'mt': 'Maltese',
    'ne': 'Nepali',
    'nb': 'Norwegian Bokmal',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sr': 'Serbian',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'es': 'Spanish',
    'sv': 'Swedish',
    'ta': 'Tamil',
    'te': 'Telugu',
    'th': 'Thai',
    'tr': 'Turkish',
    'uk': 'Urainian',
    'ur': 'Urdu',
    'vi': 'Vietnamese',
    'cy': 'Welsh'
  }

  const handleSubmit = () => {
    setLanguage(language);
    closeModal();
  }

  useEffect(()=> {
    if (language !== 'none') {
      translate({text: message, target_language: language})
      .then((res)=>setTranslation(res));
    }
  }, [language])

  const languageDropdown = Object.keys(languages).map(langKey => {
    return (
      <MenuItem key={langKey} value={langKey}>{languages[langKey]}</MenuItem>
    )
  })

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
          {'Translate Message'}
          <IconButton aria-label="close" onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <InputLabel id='open-select-label'>
            Language
            </InputLabel>
            <Select
              labelId='open-select-label'
              open={languageMenuState}
              onClose={()=>setLanguageMenuState(false)}
              onOpen={()=>setLanguageMenuState(true)}
              value={language}
              onChange={e=>setLanguage(e.target.value)}
            >
              <MenuItem key='none' value='none'>Original</MenuItem>
              {languageDropdown}
            </Select>
            <h4>Original:</h4>
            <p>{message}</p>
            <h4>Translation:</h4>
            <p>{translation}</p>
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