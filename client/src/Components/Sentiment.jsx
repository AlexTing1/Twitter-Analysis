import React, { useEffect, useState } from 'react';
import Sent from 'sentiment';
import PropTypes from 'prop-types';
import SentimentPieChart from './SentimentPieChart';

function Sentiment({ tweetData }) {
  // const [tweetData, setTweetData] = useState([]);
  const [sentiment, setSentiment] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });


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
    setSentiment(tempSentiment);
  }, [tweetData]);

  console.log(sentiment);

  return (
    <div>
      this is sentiment
      <SentimentPieChart data={sentiment} />
    </div>
  );
}

Sentiment.propTypes = {
  tweetData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sentiment;
