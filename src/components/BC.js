import React from "react";
import ApexChart from "react-apexcharts";

const BC = ({ data, fields }) => {
  // Extract values for each selected field
  const xValues = data.map((row) => row[fields.x]);
  const yValues1 = data.map((row) => row[fields.y1]);
  const yValues2 = data.map((row) => row[fields.y2]);
  const yValues3 = data.map((row) => row[fields.y3]);
  const yValues4 = data.map((row) => row[fields.y4]);

  const chartData = {
    options: {
      xaxis: {
        categories: xValues,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      legend: {
        show: true,
      },
    },
    series: [
      {
        name: fields.y1,
        data: yValues1,
        type: "bar"
      },
      {
        name: fields.y2,
        data: yValues2,
        type: "bar"
      },
      {
        name: fields.y3,
        data: yValues3,
        type: "line"
      },
      {
        name: fields.y4,
        data: yValues4,
        type: "line"
      },
    ],
  };

  return (
    <div className="bar-chart">
      <h2>Bar Chart</h2>
      <ApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
      />
    </div>
  );
};

export default BC;
