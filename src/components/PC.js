import React from "react";
import ApexChart from "react-apexcharts";

const PC = ({ data, xField, yField }) => {
  const xValues = data.map((row) => row[xField]);
  const yValues = data.map((row) => parseFloat(row[yField]));

  const chartData = {
    options: {
      labels: xValues,
      legend: {
        show: true,
      },
    },
    series: yValues,
  };

  return (
    <div className="pie-chart">
      <h2>Data types</h2>
      <ApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
      />
    </div>
  );
};

export default PC;
