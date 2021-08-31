import React from 'react';
import stopword from 'stopword';
import ReactWordCloud from 'react-wordcloud';
import PropTypes from 'prop-types';
import css from './css/popularWords.css';
//  react-wordcloud
function PopularWords({ tweetData }) {
  function getWordCount() {
    const wordTracker = {};
    const result = [];
    tweetData.forEach((tweet) => {
      const currentText = stopword.removeStopwords(tweet.text.split(' '));
      // console.log(currentText);
      currentText.forEach((word) => {
        if (wordTracker[word] === undefined) {
          wordTracker[word] = 1;
        } else {
          wordTracker[word] += 1;
        }
      });
    });
    console.log(wordTracker);

    const wordTrackerKeys = Object.keys(wordTracker);
    wordTrackerKeys.forEach((key) => {
      if (wordTracker[key] > 1) {
        const current = { text: key, value: wordTracker[key] };
        result.push(current);
      }
    });
    console.log(result);
    return result;
  }

  const callbacks = {
    getWordTooltip: (word) => `${word.text} (${word.value}) `,
  };

  const options = {
    enableTooltip: true,
    fontSizes: [20, 80],
  };

  const size = [1000, 500];

  const wordCount = getWordCount();
  // console.log(wordCountDict);
  return (
    <div className={css.container}>
      <span className={css.text}>Social Key Words aggregated by Certik</span>
      <br />
      <br />
      <div className={css.wordCloud}>
        <ReactWordCloud
          callbacks={callbacks}
          size={size}
          options={options}
          words={wordCount}
        />
      </div>

    </div>
  );
}

PopularWords.propTypes = {
  tweetData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PopularWords;
