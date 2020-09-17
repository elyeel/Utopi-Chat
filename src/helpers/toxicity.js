import * as toxicity from '@tensorflow-models/toxicity';

const threshold = 0.9;

toxicity.load(threshold).then(model => {
  const sentences = ['you suck'];
  model.classify(sentences).then(predictions => {
    console.log(predictions);    
  })
})