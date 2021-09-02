import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import css from './css/sentimentPieChart.css';

function SentimentPieChart({
  data, dataPercent, startDate, endDate, posPercent, negPercent, neutPercent
}) {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      title: {
        display: true,
        text: `From ${startDate} - ${endDate}`,
        position: 'top',
        align: 'start',
        font: {
          size: 24,
        },
      },
    },
    layout: {
      padding: 20,
    },

    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

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
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = 'lightGrey';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  }];
  const positive = `Positive
  ${posPercent}%`;

  const pieData = {
    labels: [positive, `Neutral \n ${neutPercent}%`, `Negative \n ${negPercent}%`],
    datasets: [{
      data: [data.positive, data.neutral, data.negative],
      backgroundColor: ['#42F300', '#8F8F8F', '#FFC900'],
      hoverBackgroundColor: ['#42F300', '#8F8F8F', '#FFC900'],

    }],

  };
  // console.log(pieData);

  return (
    <div className={css.container}>
      <Doughnut
        data={pieData}
        options={options}
        plugins={plugins}
      />
    </div>
  );
}

SentimentPieChart.propTypes = {
  data: PropTypes.shape({
    positive: PropTypes.number.isRequired,
    neutral: PropTypes.number.isRequired,
    negative: PropTypes.number.isRequired,
  }).isRequired,
  dataPercent: PropTypes.number.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

export default SentimentPieChart;
