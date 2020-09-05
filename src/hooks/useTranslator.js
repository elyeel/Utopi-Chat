import uuidv4 from 'uuid/v4';
import request from 'request';

export default function useTranslator() {
  let options = {
    method: 'POST',
    baseUrl: process.env.REACT_APP_TRANSLATOR_ENDPOINT,
    url: 'translate',
    qs: {
      'api-version': '3.0',
      'to': ['de', 'it']
    },
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.REACT_APP_TRANSLATOR_API_KEY,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    body: [{
      'text': 'Hello World!'
    }],
    json: true,
  }

  request(options, function(err, res, body) {
    console.log(JSON.stringify(body, null, 4));
  })

  const translate = (message) => {
    console.log(message);

  }

  return ({
    translate
  })
}