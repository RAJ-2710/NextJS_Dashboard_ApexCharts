// import { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// function App() {

//   const [state, ] = useState({
    
//     series: [{
//       name: 'Actual',
//       type: 'column',
//       data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
//     }, {
//       name: 'Accrued',
//       type: 'column',
//       data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
//     }, {
//       name: 'Estimated',
//       type: 'line',
//       data: [1.8917, 42.3554, 37, 36, 44, 45, 50, 58]
//     },
//     {
//       name: 'Cost per GJ',
//       type: 'line',
//       data: [40.5045, 42.3554, 37, 36, 44, 45, 50, 58]
//     }
//   ],
//     options: {
//       chart: {
//         height: 350,
//         type: 'line',
//         stacked: false
//       },
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         width: [1, 1, 4]
//       },
//       title: {
//         text: 'Energy - Dates',
//         align: 'left',
//         offsetX: 110
//       },
//       xaxis: {
//         categories: ["September 2022", 2010, 2011, 2012, 2013, 2014, 2015, 2016],
//       },
//       yaxis: [
//         {
//           axisTicks: {
//             show: true,
//           },
//           axisBorder: {
//             show: true,
//             color: '#008FFB'
//           },
//           labels: {
//             style: {
//               colors: '#008FFB',
//             }
//           },
//           title: {
//             text: "Actual",
//             style: {
//               color: '#008FFB',
//             }
//           },
//           tooltip: {
//             enabled: true
//           }
//         },
//         {
//           seriesName: 'Income',
//           opposite: true,
//           axisTicks: {
//             show: true,
//           },
//           axisBorder: {
//             show: true,
//             color: '#00E396'
//           },
//           labels: {
//             style: {
//               colors: '#00E396',
//             }
//           },
//           title: {
//             text: "Operating Cashflow (thousand crores)",
//             style: {
//               color: '#00E396',
//             }
//           },
//         },
//         {
//           seriesName: 'Income',
//           opposite: false,
//           axisTicks: {
//             show: true,
//           },
//           axisBorder: {
//             show: true,
//             color: '#00E396'
//           },
//           labels: {
//             style: {
//               colors: '#00E396',
//             }
//           },
//           title: {
//             text: "Operating Cashflow (thousand crores)",
//             style: {
//               color: '#00E396',
//             }
//           },
//         },
//         {
//           seriesName: 'Revenue',
//           opposite: true,
//           axisTicks: {
//             show: true,
//           },
//           axisBorder: {
//             show: true,
//             color: '#FEB019'
//           },
//           labels: {
//             style: {
//               colors: '#FEB019',
//             },
//           },
//           title: {
//             text: "Cost per GJ",
//             style: {
//               color: '#FEB019',
//             }
//           }
//         },
//       ],
//       tooltip: {
//         fixed: {
//           enabled: true,
//           position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
//           offsetY: 30,
//           offsetX: 60
//         },
//       },
//       legend: {
//         horizontalAlign: 'left',
//         offsetX: 40
//       }
//     },
//   });


//   return (
//     <div className="App">
//       <header className="App-header">
//         <div>
//           <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import Papa from 'papaparse';
import ReactApexChart from 'react-apexcharts';

function App() {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
          },
          title: {
            text: 'Actual',
            style: {
              color: '#008FFB',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          opposite: false,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00e397',
          },
          labels: {
            style: {
              colors: '#00e397',
            },
          },
          title: {
            text: 'Accrued',
            style: {
              color: '#00e397',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#feb219',
          },
          labels: {
            style: {
              colors: '#feb219',
            },
          },
          title: {
            text: 'Estimated',
            style: {
              color: '#feb219',
            },
          },
          min: 0,
          max: 60,
        },
        {
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#ff4561',
          },
          labels: {
            style: {
              colors: '#ff4561',
            },
          },
          title: {
            text: 'Cost per GJ',
            style: {
              color: '#ff4561',
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 30,
          offsetX: 60,
        },
        min: 0,
        max: 50,
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
    },
  });

  // const [pieChartState, setPieChartState] = useState({
  //   series: [],
  //   options: {
  //     chart: {
  //       width: '80%',
  //       height: '350px',
  //       type: 'pie',
  //     },
  //     labels: [],
  //     title: {
  //       text: 'Carbon Emission by Location',
  //       align: 'justify',
  //       margin: 10,
  //       style: {
  //         fontSize: '20px',
  //       },
  //     },
  //     colors: [
  //       '#E91E63',
  //       '#9C27B0',
  //       '#2196F3',
  //       '#009688',
  //       '#FF5722',
  //       '#CDDC39',
  //       '#FF9800',
  //       '#795548',
  //       '#607D8B',
  //       '#F44336',
  //     ],
  //   },
  // });

  useEffect(() => {
    // Fetch your CSV data for the main chart
    fetch('/Energy.csv')
      .then((response) => response.text())
      .then((csv) => {
        const parsedData = Papa.parse(csv, { header: true });

        setChartState((prevState) => ({
          ...prevState,
          series: [
            {
              name: 'Actual',
              type: 'column',
              data: parsedData.data.map((item) => parseFloat(item['Actual'])),
            },
            {
              name: 'Accrued',
              type: 'column',
              data: parsedData.data.map((item) => parseFloat(item['Accrued'])),
            },
            {
              name: 'Estimated',
              type: 'line',
              data: parsedData.data.map((item) => parseInt(item['Estimated'])),
            },
            {
              name: 'Cost per GJ',
              type: 'line',
              data: parsedData.data.map((item) => parseFloat(item['Cost per GJ'])),
            },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              categories: parsedData.data.map((item) => item['Month']),
            },
          },
        }));
      })
      .catch((error) => {
        console.error('Error fetching or parsing CSV data:', error);
      });

    // Fetch your CSV data for the pie chart
    // fetch('/Activity by location.csv')
    //   .then((response) => response.text())
    //   .then((csv) => {
    //     const parsedData = Papa.parse(csv, { header: true });

    //     setPieChartState((prevState) => ({
    //       ...prevState,
    //       series: [
    //         {
    //           name: 'CO2e (t)',
    //           data: parsedData.data.map((item) => parseFloat(item['CO2e (t)'])),
    //         },
    //       ],
    //       options: {
    //         ...prevState.options,
    //         labels: parsedData.data.map((item) => item['Locations']),
    //       },
    //     }));
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching or parsing CSV data for the pie chart:', error);
    //   });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="column">
          <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={350} />
        </div>
        {/* <div className="column">
          <ReactApexChart options={pieChartState.options} series={pieChartState.series} type="pie" height={350} />
        </div> */}
      </header>
    </div>
  );
}

export default App;