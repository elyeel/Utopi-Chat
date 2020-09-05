import axios from 'axios';

export default function useTranslator() {

  const translate = (message) => {
    console.log(message);
  }

  return ({
    translate
  })
}