import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';

export default function toxicityCheck(text, callback) {
  const threshold = 0.9;
  
  toxicity.load(threshold).then(model => {
    const sentences = [text];
    model.classify(sentences).then(predictions => {    
      callback(predictions);
      return predictions[6].results[0].match === true;
    })
  })
}
