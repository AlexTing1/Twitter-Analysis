var Sentiment = require('sentiment');

var sentiment = new Sentiment();
var stringToAnalyze = "Cats are stupid. I love rocks. Cars are good. Dogs are cool. Drugs are bad.";
var result = sentiment.analyze(stringToAnalyze);

console.log(result.score);
