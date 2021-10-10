import React from 'react';
import stopword from 'stopword';
import ReactWordCloud from 'react-wordcloud';
import PropTypes from 'prop-types';
import css from './css/popularWords.css';

//  PopularWords takes in the tweetData which is a users Twitter data of historical tweets,
//  and then will use this data to calculate the most popular non-stop words for the Twitter
//  user and display that information using a wordcloud.

//  PopularWords uses npm package react-wordcloud to create the wordcloud, and npm package
//  stopword to filter out the stopwords in its calculations.

//  css for this file can be found in ./css/popularWords.css

//  More information about stopword: https://www.npmjs.com/package/stopword
//  More information about React-wordcloud: https://www.npmjs.com/package/react-wordcloud
function PopularWords({ tweetData }) {
  //  getWordCount parses through tweetData, filters out stopwords and then returns
  //  an array of objects with the keys being text used and number of times text has been
  //  observed in tweetData. In other words, the format is [{text: word, value: count of word}].
  //  This format is the data format used for react-wordCloud.
  function getWordCount() {
    const wordTracker = {};
    const result = [];
    tweetData.forEach((tweet) => {
      const currentText = stopword.removeStopwords(tweet.text.split(' '));
      currentText.forEach((word) => {
        if (wordTracker[word] === undefined) {
          wordTracker[word] = 1;
        } else {
          wordTracker[word] += 1;
        }
      });
    });

    const wordTrackerKeys = Object.keys(wordTracker);
    wordTrackerKeys.forEach((key) => {
      if (wordTracker[key] > 1) {
        const current = { text: key, value: wordTracker[key] };
        result.push(current);
      }
    });
    return result;
  }

  const callbacks = {
    getWordTooltip: (word) => `${word.text} (${word.value}) `,
  };

  const options = {
    enableTooltip: true,
    fontSizes: [5, 40],
    rotations: 3,
    rotationAngles: [0, 0],
  };

  const wordCount = getWordCount();

  return (
    <div className={css.container}>
      <span className={css.text}>Social Key Words aggregated</span>
      <br />
      <br />
      <div className={css.wordCloud}>
        <ReactWordCloud
          callbacks={callbacks}
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
