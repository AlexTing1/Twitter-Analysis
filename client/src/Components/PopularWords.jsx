import React from 'react';
import stopword from 'stopword';
import { TagCloud } from 'react-tagcloud';
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
        const current = { value: key, count: wordTracker[key] };
        result.push(current);
      }
    });
    console.log(result);
    return result;
  }

  const wordCount = getWordCount();
  // console.log(wordCountDict);
  return (
    <div className={css.container}>
      this is popular words
      <div className={css.tooltip}>
        Hover over me
        <span className={css.tooltiptext}>Tooltip text</span>
      </div>
      <TagCloud
        minSize={24}
        maxSize={70}
        tags={wordCount}
        /* onClick={(tag) => alert(`'${tag.value}' was selected!`)} */
        onMouseOver={(tag) => (<div>testing</div>)}
      />
    </div>
  );
}

export default PopularWords;
