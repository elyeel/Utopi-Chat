import axios from 'axios';

export default function translate(request) {
  return axios.post('/api/translate', {
    text: request.text,
    target_language: request.target_language
  })
  // .then(response => response.data.translations[0])
  .then(response => response.data.result.translations[0].translation)
  .catch(err => console.log(err));
}