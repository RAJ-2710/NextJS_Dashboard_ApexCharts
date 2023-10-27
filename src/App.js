import React, { useState } from "react";
import "./App.css";
import FU from "./components/file_up";
import PC from "./components/PC";
import BF from "./components/bar_file";
import BC from "./components/BC";

function App() {
  const [csvData, setCsvData] = useState([]);
  const [xField, setXField] = useState("");
  const [yField, setYField] = useState("");
  const [barXField, setBarXField] = useState("");
  const [barYField1, setBarYField1] = useState("");
  const [barYField2, setBarYField2] = useState("");
  const [barYField3, setBarYField3] = useState("");
  const [barYField4, setBarYField4] = useState("");
  const [error, setError] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const handleFileUpload = (csvText) => {
    const Papa = require("papaparse");
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setCsvData(result.data);
      },
    });
  };

  const handleGenerateChart = () => {
    if (!xField || !yField) {
      setError("Please select both 'x' and 'y' fields for the Pie Chart.");
    } else {
      setError("");
    }
  };

  const handleGenerateBarChart = () => {
    if (!barXField || (!barYField1 && !barYField2 && !barYField3 && !barYField4) || coordinates.length === 0) {
      setError("Please select 'x' and at least one 'y' field and upload coordinates for the Bar Chart.");
    } else {
      setError("");
    }
  };

  const handleCoordinatesUpload = (coordinatesText) => {
    const Papa = require("papaparse");
    Papa.parse(coordinatesText, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setCoordinates(result.data);
      },
    });
  };

  return (
    <div className="App">
      <div className="card">
        <h2>Pie Chart Generator</h2>
        <FU onFileUpload={handleFileUpload} />
        <select onChange={(e) => setXField(e.target.value)} value={xField}>
          <option value="">Select 'x' field</option>
          {Object.keys(csvData[0] || {}).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <select onChange={(e) => setYField(e.target.value)} value={yField}>
          <option value="">Select 'y' field</option>
          {Object.keys(csvData[0] || {}).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <button onClick={handleGenerateChart}>Generate Pie Chart</button>
        {error && <div className="error">{error}</div>}
        {xField && yField && !error && csvData.length > 0 && (
          <PC data={csvData} xField={xField} yField={yField} />
        )}
      </div>

      <div className="card">
        <h2>Bar Chart Generator</h2>
        <BF onCoordinatesUpload={handleCoordinatesUpload} />
        <select onChange={(e) => setBarXField(e.target.value)} value={barXField}>
          <option value="">Select 'x' field</option>
          {Object.keys(coordinates[0] || {}).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <select onChange={(e) => setBarYField1(e.target.value)} value={barYField1}>
          <option value="">Select 'y' field 1</option>
          {Object.keys(coordinates[0] || {}).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <select onChange={(e) => setBarYField2(e.target.value)} value={barYField2}>
          <option value="">Select 'y' field 2</option>
          {Object.keys(coordinates[0] || {}).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <select onChange={(e) => setBarYField3(e.target.value)} value={barYField3}>
          <option value="">Select 'y' field 3</option>
          {Object.keys(coordinates[0] || {}).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <select onChange={(e) => setBarYField4(e.target.value)} value={barYField4}>
          <option value="">Select 'y' field 4</option>
          {Object.keys(coordinates[0] || {}).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
          </select>
          <button onClick={handleGenerateBarChart}>Generate Bar Chart</button>
          {error && <div className="error">{error}</div>}
          {barXField && (barYField1 || barYField2 || barYField3 || barYField4) && !error && coordinates.length > 0 && (
            <BC data={coordinates} fields={{ x: barXField, y1: barYField1, y2: barYField2, y3: barYField3, y4: barYField4 }} />
          )}
        </div>
      </div>
  );
}

export default App;
