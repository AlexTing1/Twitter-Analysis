import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';

function Graph({ tweetData, likedTweetsData, retweetData }) {
  const [currentTimeIndex, setCurrentTimeIndex] = useState('Day');
  const [currentTimeRange, setCurrentTimeRange] = useState('7');

  const [likeDataSet, setLikedDataSet] = useState([]);
  const [tweetDataSet, setTweetDataSet] = useState([{ x: 0, y: 0 }]);
  const [retweetDataSet, setRetweetDataSet] = useState([{ x: 0, y: 0 }]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  }

  function lastDays(timeFrame) {
    const result = {};
    for (let i = 0; i < timeFrame; i += 1) {
      const d = new Date();
      //d.setDate(d.getDate() - i);
      result[formatDate(d.setDate(d.getDate() - i))] = 1;
    }
    return result;
  }

  function onChangeIndex() {
    const timeIndex = document.getElementById('timeIndex');
    const selectedText = timeIndex.options[timeIndex.selectedIndex].text.split(' ')[1];
    setCurrentTimeIndex(selectedText);
    if (selectedText === 'By Month') {
      setCurrentTimeRange('3 months');
    } else if (selectedText === 'By Week') {
      setCurrentTimeRange('7 weeks');
    } else {
      setCurrentTimeRange('7 days');
    }
  }

  function onChangeRange() {
    const timeHorizon = document.getElementById('timeHorizon');
    const selectedTime = timeHorizon.options[timeHorizon.selectedIndex].text.split(' ')[0];
    setCurrentTimeRange(parseInt(selectedTime, 10));
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

  function getDataWeek(timeHorizon, dataSet) {
    const dates = {};
    const weekData = {};
    for (let i = 0; i <= timeHorizon; i += 1) {
      //const d = new Date();
      const currentWeekDates = {};
      //d.setDate(d.getDate() - i);

      for (let j = 0; j < 7; j += 1) {
        const d = new Date();
        currentWeekDates[(formatDate(d.setDate(d.getDate() - (j + (7 * i)))))] = 1;
      }
      const currentXAxis = i + ' weeks';
      weekData[currentXAxis] = 0;
      dates[currentXAxis] = currentWeekDates;
    }

    //console.log('this is dates: ', dates);



    for (let i = 0; i < dataSet.length; i += 1) {
      const current = dataSet[i];
      const currentDate = formatDate(current.created_at);

      const dateKeys = Object.keys(dates);
      for (let j = 0; j < dateKeys.length; j += 1) {
        let currentKey = dateKeys[j];
        if (dates[currentKey][currentDate] !== undefined) {
          weekData[currentKey] += 1;
        }
      }

    }

    const yAxis = [];
    const xAxis = [];

    /* console.log(weekData);
    console.log(Object.keys(weekData));
    console.log(Object.values(weekData)); */
    return [Object.keys(weekData).reverse(), Object.values(weekData).reverse()];
  }

  useEffect(() => {
    if (currentTimeIndex === 'Day') {
      setLikedDataSet(getDataDay(currentTimeRange, likedTweetsData));
      setTweetDataSet(getDataDay(currentTimeRange, tweetData));
      setRetweetDataSet(getDataDay(currentTimeRange, retweetData));
    } else if (currentTimeIndex === 'Week') {
      setLikedDataSet(getDataWeek(currentTimeRange, likedTweetsData));
      setTweetDataSet(getDataWeek(currentTimeRange, tweetData));
      setRetweetDataSet(getDataWeek(currentTimeRange, retweetData));
    }
  }, [tweetData, likedTweetsData, retweetData, currentTimeRange, currentTimeIndex]);

  return (
    <div>
      this is graph
      <select id="timeIndex" onChange={onChangeIndex}>
        <option value="By Day">By Day</option>
        <option value="By Week">By Week</option>
        <option value="By Month">By Month</option>
      </select>

      {currentTimeIndex === 'Day'
          && (
          <select id="timeHorizon" onChange={onChangeRange}>
            <option value="7 days">7 days</option>
            <option value="14 days">14 days</option>
            <option value="30 days">30 days</option>
          </select>
          )}
      {currentTimeIndex === 'Week' && (
        <select id="timeHorizon" onChange={onChangeRange}>
          <option value="7 weeks">7 weeks</option>
          <option value="10 weeks">10 weeks</option>
          <option value="12 weeks">12 weeks</option>
        </select>
      )}
      {currentTimeIndex === 'Month' && (
        <select id="timeHorizon" onChange={onChangeRange}>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
          <option value="6 months">6 months</option>
        </select>
      )}
      <LineGraph likeData={likeDataSet} tweetData={tweetDataSet} retweetData={retweetDataSet} />
    </div>
  );
}

Graph.propTypes = {
  likedTweetsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tweetData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Graph;
