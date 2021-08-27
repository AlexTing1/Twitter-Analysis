const Sentiment = require('sentiment');

const getSentiment = function(inputString) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(inputString);
  return result.score;
};

//console.log(getSentiment('#CertiKShield is a fully #decentralized reimbursement system, providing significant flexibility and risk-reward sharing for its members.\n\nTo learn more about why you should become a Shield Collateral provider, go to https://t.co/GS8Wyo9jS4!\n\n#staking #YieldFarm #Crypto #CertiK https://t.co/i9vvzVPng6'));
module.export.getSentiment = getSentiment;
