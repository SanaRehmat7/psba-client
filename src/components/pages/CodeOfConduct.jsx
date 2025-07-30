// pages/CodeOfConduct.jsx
import React from "react";
import FileCard from "../common/FileCard";

const files = [
  {
    id: 1,
    name: "Human Resource Manual",
    url: "https://drive.google.com/file/d/1XHlFWKtI_yBu8-gJKzEoEU2Lfo_FbFp1/view",
  },
  {
    id: 2,
    name: "Code of Conduct (Urdu Version)",
    url: "https://drive.google.com/file/d/1DEty-qTPYnxe4wQ4GFMSaFAT07ySEDq_/view",
  },
  {
    id: 3,
    name: "Code of Conduct (English Version)",
    url: "https://drive.google.com/file/d/1qlNDQeJx7SX4zQkLulHWv3nhqlGN3baj/view",
  },
];

const CodeOfConduct = () => {
  return (
    <div className="bg-green-50 min-h-screen py-12 px-6 sm:px-12 font-sans">
      {/* Header */}
      <div className="w-full bg-green-800 max-w-3xl mx-auto text-center mb-10 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Code of Conduct</h2>
        <p className="text-yellow-400 text-sm">
          Click below to view or download the documents
        </p>
      </div>

      {/* File List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {files.map((file, index) => (
          <FileCard
            key={file.id}
            id={file.id}
            name={file.name}
            url={file.url}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CodeOfConduct;