import React, { useEffect, useState } from 'react';
import Sent from 'sentiment';
import PropTypes from 'prop-types';
import SentimentPieChart from './SentimentPieChart';
import css from './css/sentiment.css';

//  Sentiment is a function that takes tweetData, which is a user's Twitter data between that is
//  between the startDate and endDate. Sentiment main function is to calculate the inputs used for
//  SentimentPieChart in order the create the Doughnut graph of the Sentiment data.

//  Sentiment's main function is to create the sentiment object, posPercent, neutPercent,
//  negPercent, and dataPercent and pass those values down to SentimentPieChart in order to create
//  the doughnut graph of the calcualted data.

//  sentiment = object that contains the number of positive, neutral, and negative tweets within the
//  startDate and endDate.
//  posPercent = percentage of tweets that are positive
//  neutPercent = percentage of tweets that are neutral
//  negPercent = percentage of tweets that are negative
//  dataPercent = percentage of tweets that are positive or negative.

//  Sentiment uses the sentiment npm package in order to analyze the sentiment value of a tweet.
//  More info about the sentiment package can be found here: https://www.npmjs.com/package/sentiment
function Sentiment({ tweetData, startDate, endDate }) {
  const [sentiment, setSentiment] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [posPercent, setPosPercent] = useState(0);
  const [neutPercent, setNeutPercent] = useState(0);
  const [negPercent, setNegPercent] = useState(0);
  const [dataPercent, setDataPercent] = useState(0);

  //  getSentiment is a function that analyzes the sentiment of the inputString.
  //  it utilizes the sentiment package and returns the overall sentiment score
  //  of the inputString. The score can be a negative, 0, or positive number which is used to
  //  indicate whether or not the string is negative, neutral, or positive.
  function getSentiment(inputString) {
    const sent = new Sent();
    const result = sent.analyze(inputString);
    return result.score;
  }

  useEffect(() => {
    const tempSentiment = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    tweetData.forEach((tweet) => {
      const currentSent = getSentiment(tweet.text);
      if (currentSent > 0) {
        tempSentiment.positive += 1;
      } else if (currentSent < 0) {
        tempSentiment.negative += 1;
      } else {
        tempSentiment.neutral += 1;
      }
    });
    const percent = (((tempSentiment.positive + tempSentiment.neutral)
  / (tempSentiment.neutral + tempSentiment.negative + tempSentiment.positive)) * 100).toFixed(2);

    const pos = (((tempSentiment.positive)
    / (tempSentiment.neutral + tempSentiment.negative + tempSentiment.positive)) * 100).toFixed(2);

    const neg = (((tempSentiment.negative)
    / (tempSentiment.neutral + tempSentiment.negative + tempSentiment.positive)) * 100).toFixed(2);

    const neut = (((tempSentiment.neutral)
    / (tempSentiment.neutral + tempSentiment.negative + tempSentiment.positive)) * 100).toFixed(2);
    setDataPercent(percent);
    setPosPercent(pos);
    setNegPercent(neg);
    setNeutPercent(neut);
    setSentiment(tempSentiment);
  }, [tweetData]);

  return (
    <div>
      <span className={css.text}>Certik Sentiment analysis</span>
      <br />
      <br />
      {dataPercent !== 'NaN' && <SentimentPieChart data={sentiment} dataPercent={dataPercent} posPercent={posPercent} neutPercent={neutPercent} negPercent={negPercent} startDate={startDate} endDate={endDate} /> }
    </div>
  );
}

Sentiment.propTypes = {
  tweetData: PropTypes.arrayOf(PropTypes.object).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default Sentiment;
