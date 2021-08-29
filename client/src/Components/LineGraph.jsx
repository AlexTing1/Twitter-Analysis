import React from 'react';
import { Line } from 'react-chartjs-2';

function LineGraph({ likeData, tweetData, retweetData }) {
  console.log("this is likeData: ", likeData);
  console.log('this is tweetData: ', tweetData);
  const data = {
    labels: likeData[0],
    datasets: [
      {
        label: 'liked Tweets Data',
        data: likeData[1],
        fill: false,
        borderColor: '31F21A',
      },
      {
        label: 'Tweets Data',
        data: tweetData[1],
        fill: false,
        borderColor: 'E7E72B',
      },
      {
        label: 'Retweets Data',
        data: retweetData[1],
        fill: false,
        borderColor: '001A7A',
      },
    ],
  };

  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default LineGraph;
