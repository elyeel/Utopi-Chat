import axios from 'axios';

export default function translate(request) {
  return axios.post('/api/translate', {
    text: request.text,
    target_language: request.target_language
  })
  .then(response => {
    if (response.data.result) {
      return response.data.result.translations[0].translation
    } else {
      if (response.data === 'Automatically detected source language is the same as target, cannot translate. Try to set the source language explicitly if you think the source language was not correctly detected') {
        return 'N/A';
      } else if (response.data === 'Unable to automatically detect the source language, confidence too low') {
        return 'No Result';
      } else {
        return response.data;
      }
    }
  })
  .catch(err => console.log(err));
}