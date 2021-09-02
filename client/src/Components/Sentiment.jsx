import React, { useEffect, useState } from 'react';
import Sent from 'sentiment';
import PropTypes from 'prop-types';
import SentimentPieChart from './SentimentPieChart';
import css from './css/sentiment.css';

function Sentiment({ tweetData, startDate, endDate }) {
  // const [tweetData, setTweetData] = useState([]);
  const [sentiment, setSentiment] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const [posPercent, setPosPercent] = useState(0);
  const [neutPercent, setNeutPercent] = useState(0);
  const [negPercent, setNegPercent] = useState(0);
  const [dataPercent, setDataPercent] = useState(0);

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
};

export default Sentiment;
