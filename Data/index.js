const Sentiment = require('sentiment');

const getSentiment = function(inputString) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(inputString);
  return result;
};

module.export.getSentiment = getSentiment;
