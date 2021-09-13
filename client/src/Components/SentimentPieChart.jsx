import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import css from './css/sentimentPieChart.css';

function SentimentPieChart({
  data, dataPercent, startDate, endDate, posPercent, negPercent, neutPercent,
}) {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        fullSize: true,
        maxHeight: 500,
        maxWidth: 800,
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          padding: 8,
          font: {
            size: 12,
          },
        },
      },
      paddingBelowLegends: false,
      title: {
        display: true,
        text: `From ${startDate} - ${endDate}`,
        position: 'top',
        align: 'center',
        font: {
          size: 18,
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 30,
      },
    },
    cutout: 100,
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
      let fontSize = (height / 240).toFixed(2);
      ctx.font = `bold ${fontSize}em sans-serif`;
      ctx.textBaseline = 'top';
      const percentText = `${dataPercent}%`;
      const percentTextX = Math.round((width - ctx.measureText(percentText).width) / 2);
      const percentTextY = height / 2.4;
      ctx.fillText(percentText, percentTextX, percentTextY);

      fontSize = (height / 600).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = 'top';
      const nonNegText = 'Non-negative';
      const nonNegTextX = Math.round((width - ctx.measureText(nonNegText).width) / 2);
      const nonNegTextY = height / 2.0;
      ctx.fillText(nonNegText, nonNegTextX, nonNegTextY);

      const recogText = 'Recognition';
      const recogTextX = Math.round((width - ctx.measureText(recogText).width) / 2);
      const recogTextY = height / 1.85;
      ctx.fillText(recogText, recogTextX, recogTextY);
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#fbfbfc';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  },
  ];

  const pieData = {
    labels: [['Positive', `${posPercent}%`], ['Neutral', `${neutPercent}%`], ['Negative', `${negPercent}%`]],
    datasets: [{
      data: [data.positive, data.neutral, data.negative],
      backgroundColor: ['#40b884', '#486a79', '#FFC900'],
      hoverBackgroundColor: ['#40b884', '#486a79', '#FFC900'],
      borderWidth: 1,
    }],

  };

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
  posPercent: PropTypes.number.isRequired,
  negPercent: PropTypes.number.isRequired,
  neutPercent: PropTypes.number.isRequired,
};

export default SentimentPieChart;
