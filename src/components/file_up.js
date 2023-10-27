import React, { useState } from "react";

const FU = ({ onFileUpload }) => {
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
        onFileUpload(text);
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default FU;
