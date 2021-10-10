import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sentiment from './Sentiment';
import PopularWords from './PopularWords';
import Graph from './Graph';
import css from './css/app.css';

//  Main function of the program. App retrieves all the necessary twitter data in the correct format
//  from Twitter API and sends that information to the right files. Data is collected using Twitter
//  API. Function calls are creatd under server/index.js.
function TwitterAnalysis() {
  const id = '1232319080637616128'; //  This is Certik's twitter id
  const startDate = '2021-01-01T00:00:00Z'; //  This is the date where I start collection data.
  const [tweetData, setTweetData] = useState([]);
  const [likedTweetsData, setLikedTweetsData] = useState([]);
  const [retweetData, setRetweetData] = useState([]);
  const [doughnutTweetData, setDoughnutTweetData] = useState([]);

  //  get tweets that are only retweets from data input
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

  //  takes in dateString and returns date in format month/day/year
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  }

  const date = new Date();
  const endDate = formatDate(date);
  date.setDate(date.getDate() - 7);
  const doughStartUnformat = `${date.toISOString().split('T')[0]}T00:00:00Z`;

  const sentimentStartDate = formatDate(date);

  useEffect(() => {
    axios.get(`/tweets/${id}`, {
      params: {
        startDate,
      },
    })
      .then((resp) => {
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
      <div className={css.pieGraph}>
        <Sentiment tweetData={doughnutTweetData} startDate={sentimentStartDate} endDate={endDate} />
      </div>
      <div className={css.otherGraph}>
        <Graph tweetData={tweetData} likedTweetsData={likedTweetsData} retweetData={retweetData} />
        <PopularWords tweetData={tweetData} />
      </div>

    </div>

  );
}

export default TwitterAnalysis;
