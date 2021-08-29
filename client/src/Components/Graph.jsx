import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function Graph({ tweetData, likedTweetsData }) {
  const [currentTimeIndex, setCurrentTimeIndex] = useState('By Day');
  const [currentTimeRange, setCurrentTimeRange] = useState('7 days');

  // data structure for Line[{x: xValue, y: yValue}]
  const [sevenDays, setSevenDays] = useState([{ x: 0, y: 0 }]);
  const [fourteenDays, setFourteenDays] = useState([{ x: 0, y: 0 }]);
  const [thirtyDays, setThirtyDays] = useState([{ x: 0, y: 0 }]);

  const [sevenWeeks, setSevenWeeks] = useState([{ x: 0, y: 0 }]);
  const [tenWeeks, setTenWeeks] = useState([{ x: 0, y: 0 }]);
  const [twelveWeeks, setTweleveWeeks] = useState([{ x: 0, y: 0 }]);

  const [threeMonths, setThreeMonths] = useState([{ x: 0, y: 0 }]);
  const [fourtMonths, setFourMonths] = useState([{ x: 0, y: 0 }]);
  const [sixMonths, setSixMonths] = useState([{ x: 0, y: 0 }]);

  const [likeDataSet, setLikedDataSet] = useState([{ x: 0, y: 0 }]);
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

  function formatLikedData(timeFrame) {
    const likedData = {};
  }

  function onChangeIndex() {
    const timeIndex = document.getElementById('timeIndex');
    const selectedText = timeIndex.options[timeIndex.selectedIndex].text;
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
    const selectedTime = timeHorizon.options[timeHorizon.selectedIndex].text;
    setCurrentTimeRange(selectedTime);
  }

  function getLikedData(timeHorizon, type) {
    const dates = lastDays(timeHorizon);
    const dateTracker = {};
    const result = [];
    for (let i = 0; i < likedTweetsData.length; i += 1) {
      const current = likedTweetsData[i];
      const currentDate = formatDate(current.created_at);
      if (dateTracker[currentDate] === undefined) {
        dateTracker[currentDate] = 1;
      } else {
        dateTracker[currentDate] += 1;
      }
    }

    const dateTrackerKeys = Object.keys(dateTracker);

    for (let i = 0; i < dateTrackerKeys.length; i += 1) {
      const currentKey = dateTrackerKeys[i];

    }
  }

  useEffect(() => {

  }, [tweetData, likedTweetsData]);

  return (
    <div>
      this is graph
      <select id="timeIndex" onChange={onChangeIndex}>
        <option value="By Day">By Day</option>
        <option value="By Week">By Week</option>
        <option value="By Month">By Month</option>
      </select>

      {currentTimeIndex === 'By Day'
          && (
          <select id="timeHorizon" onChange={onChangeRange}>
            <option value="7 days">7 days</option>
            <option value="14 days">14 days</option>
            <option value="30 days">30 days</option>
          </select>
          )}
      {currentTimeIndex === 'By Week' && (
        <select id="timeHorizon" onChange={onChangeRange}>
          <option value="7 weeks">7 weeks</option>
          <option value="10 weeks">10 weeks</option>
          <option value="12 weeks">12 weeks</option>
        </select>
      )}
      {currentTimeIndex === 'By Month' && (
        <select id="timeHorizon" onChange={onChangeRange}>
          <option value="3 months">3 months</option>
          <option value="4 months">4 months</option>
          <option value="6 months">6 months</option>
        </select>
      )}
    </div>
  );
}

Graph.propTypes = {
  likedTweetsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tweetData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Graph;