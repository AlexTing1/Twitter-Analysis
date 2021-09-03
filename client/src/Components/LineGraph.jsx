import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import css from './css/lineGraph.css';

function LineGraph({ likeData, tweetData, retweetData }) {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        pointStyle: 'circle',
      },
    },
    layout: {
      padding: 20,
    },

    elements: {
      arc: {
        borderWidth: 0,
      },
      line: {
        tension: 0,
      },
    },
    bezierCurve: true,
    responsive: true,
    maintainAspectRatio: false,
  };

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
    <div className={css.container}>
      <Line data={data} options={options} />
    </div>
  );
}

LineGraph.propTypes = {
  likeData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.numbers)).isRequired,
  tweetData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.numbers)).isRequired,
  retweetData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.numbers)).isRequired,
};

export default LineGraph;
