import uuidv4 from 'uuid/v4';
import request from 'request';

export default function useTranslator() {

  const translate = (message, language) => {
    let options = {
      method: 'POST',
      baseUrl: process.env.REACT_APP_TRANSLATOR_ENDPOINT,
      url: 'translate',
      qs: {
        'api-version': '3.0',
        'to': language
      },
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.REACT_APP_TRANSLATOR_API_KEY,
        'Ocp-Apim-Subscription-Region': 'eastus',
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      body: [{
        'text': message
      }],
      json: true,
    }
    request(options, function(err, res, body) {
      console.log(JSON.stringify(body, null, 4));
    })
  }

  return ({
    translate
  })
}