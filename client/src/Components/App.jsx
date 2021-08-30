import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sentiment from './Sentiment';
import PopularWords from './PopularWords';
import Graph from './Graph';
import css from './css/app.css';

function App() {
  const id = '1232319080637616128';
  const startDate = '2021-02-01T00:00:00Z'; //2021-08-23T00:00:00Z
  const [tweetData, setTweetData] = useState([]);
  const [likedTweetsData, setLikedTweetsData] = useState([]);
  const [retweetData, setRetweetData] = useState([]);
  const [doughnutTweetData, setDoughnutTweetData] = useState([]);

  function getRetweets(data) {
    const result = [];
    for (let i = 0; i < data.length; i += 1) {
      const currentText = data[i].text;
      const retweetTextArray = currentText.split(' ');
      if (retweetTextArray[0] === 'RT' && retweetTextArray[1][0] === '@') {
        result.push(data[i]);
      }
    }
    return result;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  }

  /* function formatDateTwitter(dateString) {
    const dateArray = dateString.split(' ');
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;
    const dateString = `${dateArray[3]}-${month}
  } */

  const date = new Date();
  const endDate = formatDate(date);
  date.setDate(date.getDate() - 7);
  const doughStartUnformat = date.toISOString().split('T')[0] + 'T00:00:00Z';

  const doughStartDate = formatDate(date);

  function lastDays(timeFrame) {
    const result = {};
    for (let i = 0; i < timeFrame; i += 1) {
      const d = new Date();
      result[formatDate(d.setDate(d.getDate() - i))] = 1;
    }
    return result;
  }

  function getDataDay(timeHorizon, dataSet) {
    const dates = lastDays(timeHorizon);
    const dateTracker = {};

    for (let i = 0; i < dataSet.length; i += 1) {
      const current = dataSet[i];
      const currentDate = formatDate(current.created_at);
      if (dateTracker[currentDate] === undefined) {
        dateTracker[currentDate] = 1;
      } else {
        dateTracker[currentDate] += 1;
      }
    }

    const dateKeys = Object.keys(dates);

    const xAxis = [];
    const yAxis = [];

    for (let i = dateKeys.length - 1; i >= 0; i -= 1) {
      const currentKey = dateKeys[i];
      xAxis.push(currentKey);
      if (dateTracker[currentKey] !== undefined) {
        yAxis.push(dateTracker[currentKey]);
      } else {
        yAxis.push(0);
      }
    }

    return [xAxis, yAxis];
  }

  useEffect(() => {
    axios.get(`/tweets/${id}`, {
      params: {
        startDate,
      },
    })
      .then((resp) => {
        console.log('this is tweet data raw: ', resp.data.data);
        setTweetData(resp.data.data);
      });
    axios.get(`/users/${id}/liked_tweets`)
      .then((resp) => {
        // console.log('this is liked data raw ', resp.data.data);
        setLikedTweetsData(resp.data.data);
      });
    axios.get(`/retweets/${id}`, {
      params: {
        startDate,
      },
    })
      .then((resp) => {
        setRetweetData(getRetweets(resp.data.data));
      });
    axios.get(`/tweets/${id}`, {

      params: {
        startDate: doughStartUnformat,
      },
    })
      .then((resp) => {
        setDoughnutTweetData(resp.data.data);
      });
  }, [id, startDate]);

  return (
    <div className={css.container}>
      <div className={css.floatChild}>
        <Sentiment tweetData={doughnutTweetData} startDate={doughStartDate} endDate={endDate} />
      </div>
      <div className={css.floatChild}>
        <Graph tweetData={tweetData} likedTweetsData={likedTweetsData} retweetData={retweetData} />
        <PopularWords tweetData={tweetData} />
      </div>

    </div>

  );
}

export default App;
