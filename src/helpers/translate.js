const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

export default function translate() {

  const languageTranslator = new LanguageTranslatorV3({
    version: '2018-05-01',
    authenticator: new IamAuthenticator({
      apikey: `${process.env.REACT_APP_TRANSLATOR_API_KEY}`,
    }),
    serviceUrl: `${process.env.REACT_APP_TRANSLATOR_ENDPOINT}`,
    headers: {
      "Content-Type": "application/json"
    },
  });

  const translateParams = {
    text: 'Hello, how are you today?',
    target: 'es'
  }

  return languageTranslator.translate(translateParams)
    .then(translationResult => {
      console.log(JSON.stringify(translationResult, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
}