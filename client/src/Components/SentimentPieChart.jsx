import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import css from './css/sentimentPieChart.css';

function SentimentPieChart({ data }) {
  /* const [pieData, setPieData] = useState([]);
  useEffect(() => {
    const tempPieData = [];
    const keys = Object.keys(data);
    keys.forEach((sentCount) => {
      const current = {
        title: sentCount,
        value: data[sentCount],
        color: '',
      };
      if (current.title === 'positive') {
        current.color = '#42F300';
      } else if (current.title === 'neutral') {
        current.color = '#8F8F8F';
      } else {
        current.color = '#FFC900';
      }
      tempPieData.push(current);
    });

    setPieData(tempPieData);
  }, [data]); */
  // eslint-disable-next-line max-len
  const percentNonNeg = ((data.positive + data.neutral) / (data.positive + data.neutral + data.negative)) * 100;

  const pieData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [data.positive, data.neutral, data.negative],
      backgroundColor: ['#42F300', '#8F8F8F', '#FFC900'],
      hoverBackgroundColor: ['#42F300', '#8F8F8F', '#FFC900'],

    }],
    text: `${percentNonNeg}%`,
  };
  console.log(pieData);

  return (
    <div className={css.container}>
      <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
}

SentimentPieChart.propTypes = {
  data: PropTypes.shape({
    positive: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired,
  }).isRequired,
};

export default SentimentPieChart;
