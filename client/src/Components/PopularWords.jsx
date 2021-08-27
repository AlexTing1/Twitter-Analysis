import React from 'react';
import stopword from 'stopword';
import { TagCloud } from 'react-tagcloud';
import ReactWordCloud from 'react-wordcloud';
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
    fontSizes: [25, 100],
  };

  const size = [500, 500];

  const wordCount = getWordCount();
  // console.log(wordCountDict);
  return (
    <div>
      this is popular words
      <div className={css.tooltip}>
        Hover over me
        <span className={css.tooltiptext}>Tooltip text</span>
      </div>
      <ReactWordCloud
        callbacks={callbacks}
        size={size}
        options={options}
        words={wordCount}
      />
    </div>
  );
}

export default PopularWords;
