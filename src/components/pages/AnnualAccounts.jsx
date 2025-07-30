import React, { useState } from "react";
import { motion } from "framer-motion";
import FileCard from "../common/FileCard";

const filesData = {
  2016: [
    {
      id: 1,
      name: "Audit Report",
      url: "https://drive.google.com/file/d/1_eFhDfwnWVq7m39NPPv7yfj4lrLi1UmV/view?usp=drive_link",
    },
    {
      id: 2,
      name: "CCG - Review Report",
      url: "https://drive.google.com/file/d/1J_27Z3-cwd9EercXzS0v28OZkaxvQMWA/view?usp=drive_link",
    },
    {
      id: 3,
      name: "Report to Directors",
      url: "https://drive.google.com/file/d/1BfNgrM8bcZtceKmvfQANB73Nl55BqE4M/view?usp=drive_link",
    },
    {
      id: 4,
      name: "Financial Statements",
      url: "https://drive.google.com/file/d/1q-DNQjGn9mH2mbyl0D-FyoRCXBjOVUeW/view?usp=drive_link",
    },
  ],
  2017: [
    {
      id: 1,
      name: "Audit Report",
      url: "https://drive.google.com/file/d/1gtdj20axboz5HQnMQT5WT36_GFbmaZiM/view?usp=drive_link",
    },
    {
      id: 2,
      name: "CCG - Review Report",
      url: "https://drive.google.com/file/d/1W0rmEfPoJPGUEon0DpIZwZL6DdZk9K5q/view?usp=drive_link",
    },
    {
      id: 3,
      name: "Report to Directors",
      url: "https://drive.google.com/file/d/1EHcLWvCLBZOz-Oe7W8FIUHaJjSuEHUrt/view?usp=drive_link",
    },
    {
      id: 4,
      name: "Financial Statements",
      url: "https://drive.google.com/file/d/1cAwhgejGOS07GuDvvN3xfzAkQx5Lv2rd/view?usp=drive_link",
    },
  ],
  2018: [
    {
      id: 1,
      name: "Audit Report",
      url: "https://drive.google.com/file/d/1swgPP7iz6fUWs7X1oFh7lY9KdSL6-oox/view?usp=drive_link",
    },
    {
      id: 2,
      name: "CCG - Review Report",
      url: "https://drive.google.com/file/d/1YCiwuY4BydDe7BRXM5t4Dc2endSW7ZKK/view?usp=drive_link",
    },
    {
      id: 3,
      name: "Report to Directors",
      url: "https://drive.google.com/file/d/15RAFCdRJ0r2bHMmoGEgOweF2VM1KvR6R/view?usp=drive_link",
    },
    {
      id: 4,
      name: "Financial Statements",
      url: "https://drive.google.com/file/d/15WLLymPXfrcAYCDbFeK1uPvVmKt5Ygid/view?usp=drive_link",
    },
  ],
  2019: [
    {
      id: 1,
      name: "Audit Report",
      url: "https://drive.google.com/file/d/12YwVSiUFC2WL5jjdYd06e5S0IrHFeYQN/view?usp=drive_link",
    },
    {
      id: 2,
      name: "CCG - Review Report",
      url: "https://drive.google.com/file/d/1CIeb-pix3mMDJDtF-41AtCRWFtbK-FDX/view?usp=drive_link",
    },
    {
      id: 3,
      name: "Report to Directors",
      url: "https://drive.google.com/file/d/189qiaT_JpjyJsLelLMcaUM9rcFcA6NRB/view?usp=drive_link",
    },
    {
      id: 4,
      name: "Financial Statements",
      url: "https://drive.google.com/file/d/1UPhf_0iVV67aXyXEAMI6CWPIZmQqKCDr/view?usp=drive_link",
    },
  ],
  2020: [
    {
      id: 1,
      name: "Audit Report",
      url: "https://drive.google.com/file/d/1dmkdNRKpINGPvch4v89WPYOj_8RNYSFr/view?usp=drive_link",
    },
    {
      id: 2,
      name: "CCG - Review Report",
      url: "https://drive.google.com/file/d/1T3wEqrjh2fjsent7FQQl1aZBkYbTGcvg/view?usp=drive_link",
    },
    {
      id: 3,
      name: "Report to Directors",
      url: "https://drive.google.com/file/d/1nhtYOWYxffGHfy94m_67MMS_Xebia82t/view?usp=drive_link",
    },
    {
      id: 4,
      name: "Financial Statements",
      url: "https://drive.google.com/file/d/1EnlwZg3qe3A45nPndRDw5vCKWTBe4f-w/view?usp=drive_link",
    },
  ],
  2021: [
    {
      id: 1,
      name: "Audit Report",
      url: "https://drive.google.com/file/d/1y7Su6h6T2nIsueUoIcmchr9yikDB_Akv/view?usp=drive_link",
    },
    {
      id: 2,
      name: "CCG - Review Report",
      url: "https://drive.google.com/file/d/1xUxVLxXMdii_8lYjvrYgEO-iVzoA8Cgm/view?usp=drive_link",
    },
    {
      id: 3,
      name: "Report to Directors",
      url: "https://drive.google.com/file/d/1T8P5AAdAV0zMaHnp1F2QaQQXjaFnyr6M/view?usp=drive_link",
    },
    {
      id: 4,
      name: "Financial Statements",
      url: "https://drive.google.com/file/d/1ulBvwLP1motrtwmOnuiZs1HjUzvYE_aH/view?usp=drive_link",
    },
  ],
};

const years = [2016, 2017, 2018, 2019, 2020, 2021];

const AnnualAccount = () => {
  const [selectedYear, setSelectedYear] = useState(2016);

  const files = filesData[selectedYear] || [];

  return (
    <div className="bg-green-50 min-h-screen py-12 px-6 sm:px-12 font-sans">
      {/* Header */}
      <div className="w-full bg-green-800 max-w-3xl mx-auto text-center mb-6 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">Annual Accounts</h2>
        <p className="text-yellow-400 text-sm">
          Click below to view or download the documents
        </p>
      </div>

      {/* Tabs */}
      <div
        className="max-w-3xl mx-auto mb-8 flex space-x-4 overflow-x-auto no-scrollbar lg:justify-center"
        style={{
          WebkitOverflowScrolling: "touch", // smooth scrolling on iOS
        }}
      >
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-semibold transition-colors duration-300
        ${
          selectedYear === year
            ? "bg-green-800 text-yellow-400 shadow-lg"
            : "bg-green-200 text-green-800 hover:bg-green-300"
        }`}
            style={{ scrollSnapAlign: "start" }} // optional for snap scrolling effect
          >
            {year}
          </button>
        ))}
      </div>

      {/* Download List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {files.length === 0 && (
          <p className="text-center text-green-800 font-semibold">
            No files available for {selectedYear}
          </p>
        )}
        {files.map((file, i) => (
          <FileCard key={file.id} id={file.id} name={file.name} url={file.url} index={i} />
        ))}
      </div>
    </div>
  );
};

export default AnnualAccount;