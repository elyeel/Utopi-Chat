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
import Loading from '../Loading';
import translate from '../../helpers/translate';


import './TranslatedMessageModal.scss';

export default function TranslatedMessageModal({isOpen, closeModal, message}) {
  const [language, setLanguage] = useState('none');
  const [languageMenuState, setLanguageMenuState] = useState(false);
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);
  const languages = {
    'ar': 'العربية',
    'bn': 'বাংলা',
    'bs': 'Босански',
    'bg': 'български език',
    'zh': '汉语',
    'zh-TW': '漢語',
    'hr': 'Hrvatski',
    'cs': 'Čeština',
    'da': 'Dansk',
    'nl': 'Nederlands',
    'en': 'English',
    'et': 'Eesti',
    'fi': 'Suomi',
    'fr': 'Français',
    'de': 'Deutsch',
    'el': 'Ελληνικά',
    'gu': 'ગુજરાતી',
    'he': 'עברית',
    'hi': 'हिन्दी',
    'hu': 'Magyar',
    'ga': 'Gaeilge',
    'id': 'Bahasa Indonesia',
    'it': 'Italiano',
    'ja': '日本語',
    'ko': '한국어/한국어',
    'lv': 'latviešu',
    'lt': 'Lietuvių',
    'ms': 'بهاس ملايو/Bahasa Melayu',
    'ml': 'മലയാളം',
    'mt': 'Malti',
    'ne': 'नेपाली',
    'nb': 'Bokmål',
    'pl': 'Język polski',
    'pt': 'Português',
    'ro': 'Română',
    'ru': 'Русский',
    'sr': 'Српски/srpski',
    'si': 'සිංහල',
    'sk': 'Slovenčina',
    'sl': 'Slovenščina',
    'es': 'Español',
    'sv': 'Svenska',
    'ta': 'தமிழ்',
    'te': 'తెలుగు',
    'th': 'ภาษาไทย',
    'tr': 'Türkçe',
    'uk': 'Українська',
    'ur': 'اُردُو',
    'vi': 'Tiếng Việt Nam',
    'cy': 'Cymraeg'
  }

  useEffect(()=> {
    if (language !== 'none') {
      setLoading(true);
      translate({text: message, target_language: language})
      .then((res)=>{
        setLoading(false);
        setTranslation(res);
      })
      .catch(err=> {
        setLoading(false);
        console.log(err);
      });
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
      onClose={closeModal}
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
            {loading ? <Loading type='spokes' color='#0021a3'/> : <p>{translation}</p>}
          </FormControl>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  )
}