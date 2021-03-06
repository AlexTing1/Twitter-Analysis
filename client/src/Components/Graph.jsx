import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import LineGraph from './LineGraph';
import css from './css/graph.css';

//  Graph function takes in tweetData, likedTweetsData, and retweetData of a user and then
//  calculates the data that will be used by LineGraph.jsx to create the line graph of the data.
//  Graph function also contains the ability to allow the user to toggle the preferred data range
//  and index of the analysis. The input data used to calculate the line graph data can be changed
//  based on a user's preferrence. In future updates, I plan on making the proces of converting raw
//  data to the requested input data more efficient.

//  css for this file can be found in ./css/graph.css
function Graph({ tweetData, likedTweetsData, retweetData }) {
  const [currentTimeIndex, setCurrentTimeIndex] = useState('Day');
  const [currentTimeRange, setCurrentTimeRange] = useState('7');

  const [likeDataSet, setLikedDataSet] = useState([]);
  const [tweetDataSet, setTweetDataSet] = useState([{ x: 0, y: 0 }]);
  const [retweetDataSet, setRetweetDataSet] = useState([{ x: 0, y: 0 }]);

  //  returns dateString into date format of month/day/year
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : `0${day}`;

    return `${month}/${day}/${year}`;
  }

  //  retuns last timeFrame dates in an object with format {date: 1}.
  function lastDays(timeFrame) {
    const result = {};
    for (let i = 0; i < timeFrame; i += 1) {
      const d = new Date();
      result[formatDate(d.setDate(d.getDate() - i))] = 1;
    }
    return result;
  }

  //  returns the data of dataSet within timeHorizon for days data.
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
    const yAxis = [];
    const xAxis = [];
    for (let i = dateKeys.length - 1; i >= 0; i -= 1) {
      const currentKey = dateKeys[i];
      if (i === 0) {
        xAxis.push('Today');
      } else if (i === 1) {
        xAxis.push('Yesterday');
      } else {
        xAxis.push(`${i}d ago`);
      }
      if (dateTracker[currentKey] !== undefined) {
        yAxis.push(dateTracker[currentKey]);
      } else {
        yAxis.push(0);
      }
    }

    return [xAxis, yAxis];
  }

  //  returns the data of dataSet within timeHorizon for weeks data.
  function getDataWeek(timeHorizon, dataSet) {
    const dates = {};
    const weekData = {};
    for (let i = 0; i <= timeHorizon; i += 1) {
      const currentWeekDates = {};
      for (let j = 0; j < 7; j += 1) {
        const d = new Date();
        currentWeekDates[(formatDate(d.setDate(d.getDate() - (j + (7 * i)))))] = 1;
      }

      let currentXAxis;
      if (i === 0) {
        currentXAxis = 'This Week';
      } else if (i === 1) {
        currentXAxis = 'Last Week';
      } else {
        currentXAxis = `${i} weeks`;
      }

      weekData[currentXAxis] = 0;
      dates[currentXAxis] = currentWeekDates;
    }

    for (let i = 0; i < dataSet.length; i += 1) {
      const current = dataSet[i];
      const currentDate = formatDate(current.created_at);

      const dateKeys = Object.keys(dates);
      for (let j = 0; j < dateKeys.length; j += 1) {
        const currentKey = dateKeys[j];
        if (dates[currentKey][currentDate] !== undefined) {
          weekData[currentKey] += 1;
        }
      }
    }

    return [Object.keys(weekData).reverse(), Object.values(weekData).reverse()];
  }

  //  takes dateString and format in months/year
  function formatDateMonth(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : `0${month}`;

    return `${month}/${year}`;
  }

  //  returns the data of dataSet within timeHorizon for months data.
  function getDataMonth(timeHorizon, dataSet) {
    const monthData = {};
    const xAxis = [];
    for (let i = 0; i < timeHorizon; i += 1) {
      if (i === 0) {
        xAxis.push('This Month');
      } else if (i === 1) {
        xAxis.push('Last Month');
      } else {
        xAxis.push(`${i}m ago`);
      }
    }

    for (let i = 0; i < timeHorizon; i += 1) {
      const d = new Date();
      const date = formatDateMonth(d.setDate(d.getDate() - (32 * i)));
      monthData[date] = 0;
    }

    for (let i = 0; i < dataSet.length; i += 1) {
      const current = dataSet[i];
      const currentMonthYear = formatDateMonth(current.created_at);

      if (monthData[currentMonthYear] !== undefined) {
        monthData[currentMonthYear] += 1;
      }
    }
    return [xAxis.reverse(), Object.values(monthData).reverse()];
  }

  //  gets selected index of user (Month, weeks, or days).
  function onChangeIndex() {
    const timeIndex = document.getElementById('timeIndex');
    const selectedText = timeIndex.options[timeIndex.selectedIndex].text.split(' ')[1];
    setCurrentTimeIndex(selectedText);
    if (selectedText === 'Month') {
      setCurrentTimeRange('3');
    } else {
      setCurrentTimeRange('7');
    }
  }

  //  gets selected time range of user.
  function onChangeRange() {
    const timeHorizon = document.getElementById('timeHorizon');
    const selectedTime = timeHorizon.options[timeHorizon.selectedIndex].text.split(' ')[0];
    setCurrentTimeRange(parseInt(selectedTime, 10));
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
    } else {
      setLikedDataSet(getDataMonth(currentTimeRange, likedTweetsData));
      setTweetDataSet(getDataMonth(currentTimeRange, tweetData));
      setRetweetDataSet(getDataMonth(currentTimeRange, retweetData));
    }
  }, [tweetData, likedTweetsData, retweetData, currentTimeRange, currentTimeIndex]);

  return (
    <div>
      <span className={css.text}>Twitter Account Activity</span>

      {currentTimeIndex === 'Day'
          && (
          <select id="timeHorizon" onChange={onChangeRange} className={css.dropDownIndex}>
            <option value="7 days">7 days</option>
            <option value="14 days">14 days</option>
            <option value="30 days">30 days</option>
          </select>
          )}
      {currentTimeIndex === 'Week' && (
        <select id="timeHorizon" onChange={onChangeRange} className={css.dropDownIndex}>
          <option value="7 weeks">7 weeks</option>
          <option value="10 weeks">10 weeks</option>
          <option value="12 weeks">12 weeks</option>
        </select>
      )}
      {currentTimeIndex === 'Month' && (
        <select id="timeHorizon" onChange={onChangeRange} className={css.dropDownIndex}>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
          <option value="6 months">6 months</option>
        </select>
      )}

      <select id="timeIndex" onChange={onChangeIndex} className={css.dropDownType}>
        <option value="By Day">By Day</option>
        <option value="By Week">By Week</option>
        <option value="By Month">By Month</option>
      </select>

      <br />
      <br />

      <LineGraph likeData={likeDataSet} tweetData={tweetDataSet} retweetData={retweetDataSet} />
    </div>
  );
}

Graph.propTypes = {
  likedTweetsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tweetData: PropTypes.arrayOf(PropTypes.object).isRequired,
  retweetData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Graph;
