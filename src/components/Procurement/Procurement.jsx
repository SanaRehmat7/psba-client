import React, { useState } from "react";
import FileCardDate from "../Procurement/FileCardDate";

const procurementData = {
  2018: [
    {
      id: 1,
      name: "Up-gradation/Repair & Maintenance of Electrification & Civil Work, Providing & Installation of CCTV, Scanner",
      startDate: "2018-10-29",
      endDate: "2018-11-14",
      url: "https://drive.google.com/file/d/1L1CyoDlX4ew_Gm0uMxgaBTiLMohWR6C4/view?usp=drivesdk"
    }
  ],
  2017: [
    {
      id: 1,
      name: "Repair & Maintenance work, Desktop/Laptops, Photocopy Machine, Biometric attendance machines & Scanner",
      startDate: "2017-04-15",
      endDate: "2017-05-03",
      url: "https://drive.google.com/file/d/16PQVjxomJoN7XgI4B1XlnJ4-zaCOnBN5/view?usp=drivesdk"
    },
    {
      id: 2,
      name: "Refurbishment of existing Model Bazaars in Lahore",
      startDate: "2017-03-15",
      endDate: "2017-03-30",
      url: "https://drive.google.com/file/d/1YzaB0d8xLfbnsUnep6MCpEKxtVLvwnui/view?usp=drivesdk"
    },
    {
      id: 3,
      name: "Construction of different Model Bazaars",
      startDate: "2017-03-11",
      endDate: "2017-03-28",
      url: "https://drive.google.com/file/d/13lf56ZPTQUr4nQCTJOGIH9mo1MV9DtOW/view?usp=drivesdk"
    },
    {
      id: 4,
      name: "Construction of Jogging Track with concrete edges",
      startDate: "2017-01-30",
      endDate: "2017-02-14",
      url: "https://drive.google.com/file/d/1Y2s0fuNpAGnLzE8QHDbVDXEAmQhg4hYS/view?usp=drivesdk"
    },
    {
      id: 5,
      name: "ERP Solution and Implementation Services",
      startDate: "2017-01-29",
      endDate: "2017-02-14",
      url: "https://drive.google.com/file/d/101jHet4GFGHBLTT895UkRivpSAP_bn9N/view?usp=drivesdk"
    },
    {
      id: 6,
      name: "Fabrrication, Dust bins, Hiring of Services of Security Guards, Shopping Trolleys, Benches, Water Coolers, Ceiling Fans",
      startDate: "2017-01-13",
      endDate: "2017-01-31",
      url: "https://drive.google.com/file/d/1y46Vi44nDUz6WYcTb6yLL8PmOJbEe14a/view?usp=drivesdk"
    }
  ],
  2016: [
    {
      id: 1,
      name: "Fabrrication, Dust bins, Hiring of Services of Security Guards, Shopping Trolleys, Benches, Water Coolers, Ceiling Fans",
      startDate: "2016-10-19",
      endDate: "2016-11-08",
      url: "https://drive.google.com/file/d/1SmfdL90NUTsqHcfBb7_G0oPh3kpKwAzl/view?usp=drivesdk"
    },
    {
      id: 2,
      name: "[Corrigendum] Up gradation/Repair & Maintenance of Electrification, Civil and Steel Structure Works, Shopping Bags",
      startDate: "2016-03-08",
      endDate: "2016-03-08",
      url: "https://drive.google.com/file/d/17qONJWR6ip-TiSP3-11Lq7aAIbzsSP9y/view?usp=drivesdk"
    },
    {
      id: 3,
      name: "Furniture & Fixtures, Laptop/Desktop PCs, Printers & Photocopiers, LED TVs, Multimedia Projectors, Air Conditioners",
      startDate: "2016-08-24",
      endDate: "2016-08-24",
      url: "https://drive.google.com/file/d/1bIv70GbnhPtGEGaeUgc_TXMOKklc6Swx/view?usp=drivesdk"
    },
    {
      id: 4,
      name: "Appointment for Auditors",
      startDate: "2016-07-23",
      endDate: "2016-07-23",
      url: "https://drive.google.com/file/d/1j4lsUNb9zjVmlEgYf-piTIleTpEm_5ft/view?usp=drivesdk"
    },
    {
      id: 5,
      name: "Furniture, Laptop/Desktop PCs, Printers & Photocopiers, LED TVs, Multimedia Projectors, Air Conditioners, FAX",
      startDate: "2016-07-22",
      endDate: "2016-07-22",
      url: "https://drive.google.com/file/d/17Gv3V5xDICBwAN3lTAQY4JzRUj8DDArx/view?usp=drivesdk"
    },
    {
      id: 6,
      name: "Furniture, Laptop/Desktop PCs, Printers & Photocopiers, LED TVs, Multimedia Projectors, Air Conditioners, FAX Machines",
      startDate: "2016-06-03",
      endDate: "2016-06-03",
      url: "https://drive.google.com/file/d/1e65FTxFRmMblFDdWQGa2K7NkUrNMUCO_/view?usp=drivesdk"
    }
  ],

2019:[
  {
    id: 1,
    name: "Request for Proposal | Hiring of The Services of A CONSULTANCY FIRM",
    startDate: "2019-12-26",
    endDate: "2020-01-14",
    url: "https://drive.google.com/file/d/1nGqCxjpl4GOPrmGYpb08OueHxfyqSh6E/view?usp=drivesdk"
  },
  {
    id: 2,
    name: "Invitation to Bid for Providing Printing Material, Water Coolers, Biodegradable Bags, Laptop / Desktop Pcs &",
    startDate: "2019-11-15",
    endDate: "2019-12-05",
    url: "https://drive.google.com/file/d/1TtzbQv00o5OOTPgNUf6xmqLoP3zwVV2K/view?usp=drivesdk"
  },
  {
    id: 3,
    name: "Invitation for Pre-Qualification of Firms / Contractors for Construction / Refurbishment of Model Bazaars in different",
    startDate: "2019-11-15",
    endDate: "2019-11-05", // NOTE: End date earlier than start – possible input error?
    url: "https://drive.google.com/file/d/1UoLFwz2COBxfNUuSr1DN5yCzkWxk7Ng5/view?usp=drivesdk"
  },
  {
    id: 4,
    name: "Providing / installation of steel infrastructure and allied works, fabrication / installation of tables & chair",
    startDate: "2019-05-26",
    endDate: "2019-06-11",
    url: "https://drive.google.com/file/d/1P1usQIac3-VhsiY0NGwvFaVQFDOSR-b1/view?usp=drivesdk"
  },
  {
    id: 5,
    name: "Providing, fixing/installation of furniture and related accessories, Bazaar staff Uniform, Biometric Machines, Desktop",
    startDate: "2019-03-21",
    endDate: "2019-04-10",
    url: "https://drive.google.com/file/d/1r_H1AqyNd9MMaZlsBs_0K8lOiZuO-v2F/view?usp=drivesdk"
  },
  {
    id: 6,
    name: "Up gradation/Repair & Maintenance of Electrification, Civil and Steel Structure Works,Shopping Bags for dustbins",
    startDate: "2019-02-15",
    endDate: "2019-03-05",
    url: "https://drive.google.com/file/d/1GcOAGkByqpHaWIEDIJlNx-OTz82_yMXO/view?usp=drivesdk"
  }

],
2020:[
  {
    id: 1,
    name: "Tender Notice for Construction of Model Bazaar in Mianwali.",
    startDate: "2020-11-01",
    endDate: "2020-11-28",
    url: "https://drive.google.com/file/d/1y7WjBrKdOdRxZMlo6Ky0VS2zbTTMuvrh/view?usp=drivesdk"
  },
  {
    id: 2,
    name: "Tender Notice for Providing / Fixing of IT-Related Equipments at Model Bazaars in Different Districts of Punjab.",
    startDate: "2020-10-19",
    endDate: "2020-11-04",
    url: "https://drive.google.com/file/d/1Nl1hcXns3FS5G1BgvdjcGmGBeuMyUURJ/view?usp=drivesdk"
  },
  {
    id: 3,
    name: "Tender Notice for Construction / Extension of Model Bazaars in Different Districts of Punjab.",
    startDate: "2020-10-18",
    endDate: "2020-11-04",
    url: "https://drive.google.com/file/d/1EPZgqZzsMt4jb9g-VsKH3qRxhTtLb6Kk/view?usp=drivesdk"
  },
  {
    id: 4,
    name: "Tender Notice for Construction / Extension of Model Bazaars in Different Districts of Punjab.",
    startDate: "2020-06-16",
    endDate: "2020-06-30",
    url: "https://drive.google.com/file/d/1XKMVe-CLdwOg1BT8ZchmqkemoFDJyb-1/view?usp=drivesdk"
  },
  {
    id: 5,
    name: "Invitation to Bid for Various Lots.(1.Printing Material || 2.Stationary || 3.Repairing of Shopping Trollies || 4.Repair",
    startDate: "2020-01-02",
    endDate: "2020-01-21",
    url: "https://drive.google.com/file/d/1WfCQqJxiWNMuzBbotEj8vq86eWJqqgXU/view?usp=drivesdk"
  }
],
  2021: [
    {
      id: 1,
      name: "Tender Notice | Framework Contract (Shopping Trollies)",
      startDate: "2021-11-03",
      endDate: "2021-11-26",
      url: "https://drive.google.com/file/d/1YePVAAsdM5vs5d_2Z9Ez_cOU5iyOsFWB/view?usp=drivesdk",
    },
    {
      id: 2,
      name: "CORRIGENDUM | Tender Notice (Construction of New Model Bazaars).",
      startDate: "2021-10-06",
      endDate: "2021-11-10",
      url: "https://drive.google.com/file/d/1s727vK6f0a7bI7wWZcrYBPdNh7l9tPxZ/view?usp=drivesdk",
    },
    {
      id: 3,
      name: "Tender Notice | Construction of New Model Bazaars.",
      startDate: "2021-10-06",
      endDate: "2021-10-28",
      url: "https://drive.google.com/file/d/1YYKYQAFZ6WXsYTz9sLe0EIZiOEuNAZPt/view?usp=drivesdk",
    },
    {
      id: 4,
      name: "CORRIGENDUM INVITATION FOR BIDS (Framework Contracts FY 2021 - 2022).",
      startDate: "2021-07-18",
      endDate: "2021-08-26",
      url: "https://drive.google.com/file/d/1OiOrnfOCFBpkXIByXnkehMOeyt7BMwlR/view?usp=drivesdk",
    },
    {
      id: 5,
      name: "INVITATION FOR BIDS (Framework Contracts FY 2021 - 2022).",
      startDate: "2021-07-18",
      endDate: "2021-08-12",
      url: "https://drive.google.com/file/d/1OeEN2HifVl-vBFILVkX-l4CWZsaPZo7x/view?usp=drivesdk",
    },
    {
      id: 6,
      name: "Expression of Interest for Consultancy Services (Firm Selection).",
      startDate: "2021-03-26",
      endDate: "2021-04-12",
      url: "https://drive.google.com/file/d/1looVtB8FButQfGLrGT9HVTRHiZTf6A9o/view?usp=drivesdk",
    },
    {
      id: 7,
      name: "Tender Notice for Construction of Model Bazaar in Mianwali (IPL-2272).",
      startDate: "2021-03-10",
      endDate: "2021-03-26",
      url: "https://drive.google.com/file/d/1aSip85qEkC-zlEsNzOoXRDJBCG6pYpJD/view?usp=drivesdk",
    },
  ],
  2022: [
    {
      id: 1,
      name: "Tender Notice | Framework Contracts FY 2022-23.",
      startDate: "2022-02-24",
      endDate: "2022-03-14",
      url: "https://drive.google.com/file/d/1EMWLNIQDbJoEosyKcYSqsXopEIifMXuA/view?usp=drivesdk",
    },
    {
      id: 2,
      name: "Tender Notice | Construction of Multi Story Head Office Building and Model Bazaar at Taunsa Sharif.",
      startDate: "2022-02-14",
      endDate: "2022-03-07",
      url: "https://drive.google.com/file/d/1lrFyu8V1e4t92mR0HDHkjsDJx5OgNysz/view?usp=drivesdk",
    },
    {
      id: 3,
      name: "Tender Notice | Framework Contracts FY 2022-23.",
      startDate: "2022-09-08",
      endDate: "2022-09-28",
      url: "https://drive.google.com/file/d/1rQNUyZybKEYQsxEPCYMDApu13UDdp8QB/view?usp=drivesdk",
    },
  ],
  2023: [
    {
      id: 1,
      name: "Tender Notice - Construction of Model Bazaar at Mandi Bahauddin",
      startDate: "2023-09-05",
      endDate: "2023-09-28",
      url: "https://drive.google.com/file/d/1-75PU3-gDChXsPqCncSyKjd6ICXJwwSd/view?usp=drivesdk",
    },
    {
      id: 2,
      name: "CORRIGENDUM | Tender Notice - Invitation for Bids",
      startDate: "2023-12-20",
      endDate: "2024-01-24",
      url: "https://drive.google.com/file/d/1Vqe9uIhNQjO-0EUz7flhVnJ42V3QbGAp/view?usp=drivesdk",
    },
    {
      id: 3,
      name: "Tender Notice - Invitation for Bids",
      startDate: "2023-12-20",
      endDate: "2024-01-10",
      url: "https://drive.google.com/file/d/1NjvWbOh-BCUbkMB7dMu_f77qHs8Os61x/view?usp=drivesdk",
    },
    {
      id: 4,
      name: "Tender Notice - Shopping Trollies",
      startDate: "2023-04-10",
      endDate: "2023-04-28",
      url: "https://drive.google.com/file/d/1JdPh5Cf1XsK6Y5CuXSr3baFWoqte_ZvS/view?usp=drivesdk",
    },
    {
      id: 5,
      name: "Tender Notice - Tensile Fabric Sheds & Foldable Tables",
      startDate: "2023-05-10",
      endDate: "2023-05-26",
      url: "https://drive.google.com/file/d/1DGZFIArmNb9_asZOX9_XVYVevPVhKd6z/view?usp=drivesdk",
    },
    {
      id: 6,
      name: "Tender Notice | Provision of Uniform and Single-Phase Electric Meters in different Model Bazaars across the Punjab",
      startDate: "2023-05-17",
      endDate: "2023-06-06",
      url: "https://drive.google.com/file/d/1c7bprnjJX3BFycPb648ZYdrszY4QkLje/view?usp=drivesdk",
    },
    {
      id: 7,
      name: "Upgradation of Model Bazaar Township, Lahore and Construction of Boundary wall at MB Mandi Bahauddin Site",
      startDate: "2023-06-10",
      endDate: "2023-06-26",
      url: "https://drive.google.com/file/d/1ohUk3TUth3raRYN_zw-rFU96vi0xif4o/view?usp=drivesdk",
    },
    {
      id: 8,
      name: "Tender Notice | Procurement of Different Goods (LOT # 1 to 4)",
      startDate: "2023-08-01",
      endDate: "2023-08-17",
      url: "https://drive.google.com/file/d/1YC97dHEi_VZ9GDLOYbFidGoK7HFeHfAE/view?usp=drivesdk",
    },
    {
      id: 9,
      name: "Repairing of Shopping Trollies in different Model Bazaars across the Punjab",
      startDate: "2023-08-13",
      endDate: "2023-08-28",
      url: "https://drive.google.com/file/d/1pHOHLl9lr8ncGZYE2wM7nSN21uWHc4mW/view?usp=drivesdk",
    },
  ],
  2024: [
    {
      id: 1,
      name: "Instruction for Registration in E-Procurement Punjab",
      startDate: "2024-04-16",
      endDate: "2024-05-14",
      url: "https://drive.google.com/file/d/1QSA-mVoVHU7_LRFY2h-bwTW8U8dIhW1h/view?usp=drivesdk",
    },
    {
      id: 2,
      name: "Tender Notice - Invitation for Bids",
      startDate: "2024-04-16",
      endDate: "2024-05-14",
      url: "https://drive.google.com/file/d/1u-ZeCIfNsKvlc0frsoEqt8Up6zAnNU2R/view?usp=drivesdk",
    },
    {
      id: 3,
      name: "Tender Notice - Invitation for Bids",
      startDate: "2024-05-02",
      endDate: "2024-05-20",
      url: "https://drive.google.com/file/d/1a2BEOAzYF4g0PiUoWxrFeBk1hmLhPUB6/view?usp=drivesdk",
    },
    {
      id: 4,
      name: "Tender Notice - Corrigendum",
      startDate: "2024-05-07",
      endDate: "2024-05-14",
      url: "https://drive.google.com/file/d/1N5XlAT_Xj-Och3U4tqe4tBN2V9vaxemf/view?usp=drivesdk",
    },
    {
      id: 5,
      name: "Tender Notice - Corrigendum",
      startDate: "2024-05-07",
      endDate: "2024-05-20",
      url: "https://drive.google.com/file/d/1HbT8xrhUyMbPFigXOC-sK2sPKl5Xz9Nb/view?usp=drivesdk",
    },
    {
      id: 6,
      name: "E-Tender Notice (Solar)",
      startDate: "2024-05-10",
      endDate: "2024-05-31",
      url: "https://drive.google.com/file/d/1a79wUqBZP-m69AURPWfKqE4R8NXymvWz/view?usp=drivesdk",
    },
    {
      id: 7,
      name: "Tender Notice - Invitation for Bids (E-Procurement)",
      startDate: "2024-06-03",
      endDate: "2024-06-26",
      url: "https://drive.google.com/file/d/1GC5sQo-Txq0Uv0_udkY4I7BOrUQJYjDy/view?usp=drivesdk",
    },
    {
      id: 8,
      name: "Tender Notice - Invitation for Bids",
      startDate: "2024-06-13",
      endDate: "2024-07-03",
      url: "https://drive.google.com/file/d/1YMuOtuVVx0uCSxwm4zptCDqUutvuJdnz/view?usp=drivesdk",
    },
    {
      id: 9,
      name: "Tender Notice - E Advertisement Revamping of MB Vehari",
      startDate: "2024-08-21",
      endDate: "2024-09-10",
      url: "https://drive.google.com/file/d/1LN5ovVIgiel7_vnQi3nAdLSX2FegHkfa/view?usp=drivesdk",
    },
    {
      id: 10,
      name: "Tender Notice - Corrigendum (Model Bazaar Vehari)",
      startDate: "2024-08-21",
      endDate: "2024-09-13",
      url: "https://drive.google.com/file/d/1_qlx_d_942aKLvuU6wu_7Cnsm8eN6zvH/view?usp=drivesdk",
    },
    {
      id: 11,
      name: "Tender Notice - Invitation for Bids",
      startDate: "2024-09-12",
      endDate: "2024-10-04",
      url: "https://drive.google.com/file/d/1gRh5us1GGCLzaUbOsaHZn5EdsivW1mOp/view?usp=drivesdk",
    },
    {
      id: 12,
      name: "Tender Notice - Invitation for Bids",
      startDate: "2024-09-19",
      endDate: "2024-10-04",
      url: "https://drive.google.com/file/d/1gQHV7hqEy9FNpUuAK_CCNHkOI1KRdo-A/view?usp=drivesdk",
    },
  ],
};

const years = Object.keys(procurementData).sort();

const Procurement = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);

  const files = procurementData[selectedYear] || [];

  return (
    <div className="bg-green-50 min-h-screen py-12 px-6 sm:px-12 font-sans">
      {/* Header */}
      <div className="w-full bg-green-800 max-w-3xl mx-auto text-center mb-6 rounded-2xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-2">
          Procurement Documents
        </h2>
        <p className="text-yellow-400 text-sm">
          Click below to view or download the procurement files
        </p>
      </div>

      {/* Year Tabs */}
      <div
        className="max-w-3xl mx-auto mb-8 flex space-x-4 overflow-x-auto no-scrollbar lg:justify-center"
        style={{ WebkitOverflowScrolling: "touch" }}
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
            style={{ scrollSnapAlign: "start" }}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Files List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {files.length === 0 && (
          <p className="text-center text-green-800 font-semibold">
            No files available for {selectedYear}
          </p>
        )}
        {files.map((file, i) => (
          <FileCardDate
            key={file.id}
            id={file.id}
            name={file.name}
            url={file.url}
            index={i}
            startDate={file.startDate}
            endDate={file.endDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Procurement;