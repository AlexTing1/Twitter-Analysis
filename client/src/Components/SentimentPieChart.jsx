import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import css from './css/sentimentPieChart.css';

function SentimentPieChart({ data, dataPercent }) {
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
  // console.log('this is data: ', ((data.positive + data.neutral) / (data.neutral + data.negative + data.positive)) * 100);

  const plugins = [{
    beforeDraw(chart) {
      const { width } = chart;
      const { height } = chart;
      const { ctx } = chart;
      ctx.restore();
      let fontSize = (height / 300).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'top';
      const percentText = `${dataPercent}%`;
      const percentTextX = Math.round((width - ctx.measureText(percentText).width) / 2);
      const percentTextY = height / 2.2;
      ctx.fillText(percentText, percentTextX, percentTextY);

      fontSize = (height / 900).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'top';
      const nonNegText = 'Non-negative';
      const nonNegTextX = Math.round((width - ctx.measureText(nonNegText).width) / 2);
      const nonNegTextY = height / 1.95;
      ctx.fillText(nonNegText, nonNegTextX, nonNegTextY);

      const recogText = 'Recognition';
      const recogTextX = Math.round((width - ctx.measureText(recogText).width) / 2);
      const recogTextY = height / 1.86;
      ctx.fillText(recogText, recogTextX, recogTextY);
      ctx.save();
    },
  }];

  const pieData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [data.positive, data.neutral, data.negative],
      backgroundColor: ['#42F300', '#8F8F8F', '#FFC900'],
      hoverBackgroundColor: ['#42F300', '#8F8F8F', '#FFC900'],

    }],
  };
  // console.log(pieData);

  return (
    <div className={css.container}>
      <span className={css.text}>testing</span>
      <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: false }} plugins={plugins} />
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
