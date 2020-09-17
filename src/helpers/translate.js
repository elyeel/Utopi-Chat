import axios from 'axios';

export default function translate(request) {

  return axios.post('/api/translate', {
    text: request.text,
    target_language: request.target_language
  })
  .then(response => console.log(response))
  .catch(err => console.log(err));
}