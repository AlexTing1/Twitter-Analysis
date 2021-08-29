import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function LineGraph({ likeData, tweetData, retweetData }) {
  const data = {
    labels: likeData[0],
    datasets: [
      {
        label: 'liked Tweets Data',
        data: likeData[1],
        fill: false,
        borderColor: '#31F21A',
      },
      {
        label: 'Tweets Data',
        data: tweetData[1],
        fill: false,
        borderColor: '#E7E72B',
      },
      {
        label: 'Retweets Data',
        data: retweetData[1],
        fill: false,
        borderColor: '#001A7A',
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
}

LineGraph.propTypes = {
  likeData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.numbers)).isRequired,
  tweetData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.numbers)).isRequired,
  retweetData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.numbers)).isRequired,
};

export default LineGraph;
