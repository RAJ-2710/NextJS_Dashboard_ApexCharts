import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function DT({ data }) {
  const [selectedField1, setSelectedField1] = useState('');
  const [selectedField2, setSelectedField2] = useState('');
  const chartData = data.map((item) => ({
    y: item['Locations'],
    x: parseFloat(item['Proportion (%)']),
  }));
  const [fieldNames, setFieldNames] = useState([]);
  const options = {
    chart: {
      type: 'pie',
    },
    labels: chartData.map((item) => item.x),
  };
  // Extract field names when data is loaded or changes
  useEffect(() => {
    if (data && data.length > 0) {
      setFieldNames(Object.keys(data[0]));
    }
  }, [data]);

  // Update chartData when the selected fields change
  useEffect(() => {
    if (data && data.length > 0 && selectedField1 && selectedField2) {
      const field1Data = data.map((item) => item[selectedField1]);
      const field2Data = data.map((item) => item[selectedField2]);

      // Create chart data series
      const chartDataSeries = field1Data.map((_, index) => ({
        x: field1Data[index],
        y: field2Data[index],
      }));

      setChartData(chartDataSeries);
    }
  }, [data, selectedField1, selectedField2]);

  return (
    <div>
      <div>
        <label>Select Field 1:</label>
        <select onChange={(e) => setSelectedField1(e.target.value)}>
          <option value="">-- Select Field 1 --</option>
          {fieldNames.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Field 2:</label>
        <select onChange={(e) => setSelectedField2(e.target.value)}>
          <option value="">-- Select Field 2 --</option>
          {fieldNames.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div>
        {selectedField1 && selectedField2 && (
          <ReactApexChart options={options} series={chartData} type="pie" width="400" />
        )}
      </div>
    </div>
  );
}

export default DT;
