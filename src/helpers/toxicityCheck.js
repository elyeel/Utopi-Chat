import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';

export default function toxicityCheck(text) {
  const threshold = 0.9;
  return toxicity.load(threshold)
  .then(model => {
    const sentences = [text];
    return model.classify(sentences)
    .then(predictions => {    
      return predictions[6].results[0].match === true;
    })
  })
}
