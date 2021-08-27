import React, { useEffect, useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function SentimentPieChart({ data }) {
  const [pieData, setPieData] = useState([]);
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
  }, [data]);

  console.log(pieData);

  return (
    <div>
      this is sendpiechart
      <PieChart data={pieData} />
    </div>
  );
}

export default SentimentPieChart;
