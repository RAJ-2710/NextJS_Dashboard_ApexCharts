import React, { useState } from "react";

const BF = ({ onCoordinatesUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const text = event.target.result;
        onCoordinatesUpload(text);
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="coordinates-upload">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Coordinates</button>
    </div>
  );
};

export default BF;
