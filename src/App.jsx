// import React, { Suspense, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { LanguageProvider } from "./components/context/LanguageContext";
// import Layout from "./components/layout/Layout";
// import PSBALoader from "./components/common/PSBALoader";
// import * as XLSX from "xlsx";
// import BazaarLocator from "./components/home/BazaarLocator";
// import bazaarData from "../BazaarData";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
// import Dashboard from "./components/pages/Dashboard/Dashboard";

// // Lazy-loaded page components
// const Home = React.lazy(() => import("./components/pages/Home"));
// const About = React.lazy(() => import("./components/pages/About"));
// const Initiatives = React.lazy(() => import("./components/pages/Initiatives"));
// const InitiativeDetail = React.lazy(() =>
//   import("./components/initiatives/InitiativeDetail")
// );
// // const Achievements = React.lazy(() =>
// //   import("./components/layout/Achievements")
// // );
// const PSBAAppDownloadPage = React.lazy(() =>
//   import("./components/pages/PSBAAppDownloadPage")
// );
// const Contact = React.lazy(() => import("./components/pages/Contact"));
// const Bazaars = React.lazy(() => import("./components/pages/Bazaars"));
// const RtiHelpline = React.lazy(() => import("./components/pages/RtiHelpline"));
// const Gallery = React.lazy(() => import("./components/Gallery/Gallery"));
// const JourneyYear = React.lazy(() =>
//   import("./components/Journey/JourneyYear")
// );
// const YrProgress = React.lazy(() => import("./components/Journey/YrProgress"));
// const NoticesNotifications = React.lazy(() =>
//   import("./components/pages/NoticesNotifications")
// );
// const Faqs = React.lazy(() => import("./components/pages/Faqs"));
// const CodeOfConduct = React.lazy(() =>
//   import("./components/pages/CodeOfConduct")
// );
// const AnnualAccounts = React.lazy(() =>
//   import("./components/pages/AnnualAccounts")
// );
// const Procurement = React.lazy(() =>
//   import("./components/Procurement/Procurement")
// );
// const Facilities = React.lazy(() => import("./components/pages/Facilities"));
// const FYJourney = React.lazy(() => import("./components/Journey/FYJourney"));
// const AchievementsPage = React.lazy(() =>
//   import("./components/achievements/AchievementsPage")
// );
// const BazaarDetail = React.lazy(() =>
//   import("./components/pages/BazaarDetail")
// );

// // Excel data loading function
// const loadExcelData = async () => {
//   try {
//     const response = await fetch("/data/psba-data.xlsx");
//     const arrayBuffer = await response.arrayBuffer();
//     const data = new Uint8Array(arrayBuffer);
//     const workbook = XLSX.read(data, { type: "array" });

//     const datasets = {};
//     workbook.SheetNames.forEach((sheetName) => {
//       const worksheet = workbook.Sheets[sheetName];
//       datasets[sheetName] = XLSX.utils.sheet_to_json(worksheet);
//     });

//     return datasets;
//   } catch (error) {
//     console.error("Error loading Excel data:", error);
//     return {};
//   }
// };

// function App() {
//   const [excelData, setExcelData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Load Excel data on app startup
//   React.useEffect(() => {
//     const fetchData = async () => {
//       const data = await loadExcelData();
//       setExcelData(data);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <PSBALoader />;
//   }

//   return (
//     <LanguageProvider>
//       <Router>
//         <Layout>
//           <Suspense fallback={<PSBALoader />}>
//             <Routes>
//               <Route path="/" element={<Home data={excelData?.Home} />} />
//               <Route path="/about-us" element={<About />} />
//               <Route path="/initiatives" element={<Initiatives />} />
//               <Route path="/download-app" element={<PSBAAppDownloadPage />} />
//               <Route path="/helping-rti" element={<RtiHelpline />} />
//               <Route path="/psba-gallery" element={<Gallery />} />
//               <Route path="/yearly-progress" element={<YrProgress />} />
//               <Route path="/code-of-conduct" element={<CodeOfConduct />} />
//               <Route path="/annual-accounts" element={<AnnualAccounts />} />
//               <Route path="/procurement" element={<Procurement />} />
//               <Route path="/facilities" element={<Facilities />} />
//               <Route path="/journey" element={<JourneyYear />} />
//               <Route path="/faqs" element={<Faqs />} />
//               <Route
//                 path="//notices-notifications"
//                 element={<NoticesNotifications />}
//               />

//               {/* Financial year pages (dynamic) */}
//               {/* {[...Array(8)].map((_, i) => {
//                 const year = 2017 + i;
//                 return (
//                   <Route
//                     key={year}
//                     path={`/financial-year-${year}`}
//                     element={<FYJourney year={year} />}
//                   />
//                 );
//               })} */}

//               <Route
//                 path="/initiatives/:id"
//                 element={<InitiativeDetail data={excelData?.Initiatives} />}
//               />
//               <Route path="/achievements" element={<AchievementsPage />} />
//               <Route path="/contact" element={<Contact data={<Contact />} />} />
//               <Route
//                 path="/our-bazaars"
//                 element={<BazaarLocator bazaarsData={bazaarData} />}
//               />
//               {/* <Route
//                 path="/our-bazaars/:bazaarSlug"
//                 element={<BazaarDetailPage />}
//               /> */}

//               {/* <Route path="/" element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" />} /> */}
//               <Route path="/login" element={<Login/>} />
//               <Route path="/register" element={<Register />} />

//               {/* Redirect any unknown paths to home */}
//               <Route path="*" element={<Home />} />
//             </Routes>
//           </Suspense>
//         </Layout>
//       </Router>
//     </LanguageProvider>
//   );
// }

// export default App;
import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/context/LanguageContext";
import Layout from "./components/layout/Layout";
import PSBALoader from "./components/common/PSBALoader";
import BazaarLocator from "./components/home/BazaarLocator";
import bazaarData from "../BazaarData";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

// Lazy-loaded page components
const Home = React.lazy(() => import("./components/pages/Home"));
const About = React.lazy(() => import("./components/pages/About"));
const Initiatives = React.lazy(() => import("./components/pages/Initiatives"));
const InitiativeDetail = React.lazy(() =>
  import("./components/initiatives/InitiativeDetail")
);
const PSBAAppDownloadPage = React.lazy(() =>
  import("./components/pages/PSBAAppDownloadPage")
);
const Contact = React.lazy(() => import("./components/pages/Contact"));
const Bazaars = React.lazy(() => import("./components/pages/Bazaars"));
const RtiHelpline = React.lazy(() => import("./components/pages/RtiHelpline"));
const Gallery = React.lazy(() => import("./components/Gallery/Gallery"));
const JourneyYear = React.lazy(() =>
  import("./components/Journey/JourneyYear")
);
const YrProgress = React.lazy(() => import("./components/Journey/YrProgress"));
const NoticesNotifications = React.lazy(() =>
  import("./components/pages/NoticesNotifications")
);
const Faqs = React.lazy(() => import("./components/pages/Faqs"));
const CodeOfConduct = React.lazy(() =>
  import("./components/pages/CodeOfConduct")
);
const AnnualAccounts = React.lazy(() =>
  import("./components/pages/AnnualAccounts")
);
const Procurement = React.lazy(() =>
  import("./components/Procurement/Procurement")
);
const Facilities = React.lazy(() => import("./components/pages/Facilities"));
const FYJourney = React.lazy(() => import("./components/Journey/FYJourney"));
const AchievementsPage = React.lazy(() =>
  import("./components/achievements/AchievementsPage")
);
const BazaarDetail = React.lazy(() =>
  import("./components/pages/BazaarDetail")
);

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Suspense fallback={<PSBALoader />}>
          <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/initiatives/:id" element={<InitiativeDetail />} />
              <Route path="/download-app" element={<PSBAAppDownloadPage />} />
              <Route path="/helping-rti" element={<RtiHelpline />} />
              <Route path="/psba-gallery" element={<Gallery />} />
              <Route path="/yearly-progress" element={<YrProgress />} />
              <Route path="/code-of-conduct" element={<CodeOfConduct />} />
              <Route path="/annual-accounts" element={<AnnualAccounts />} />
              <Route path="/procurement" element={<Procurement />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/journey" element={<JourneyYear />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/notices-notifications" element={<NoticesNotifications />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/our-bazaars" element={<BazaarLocator bazaarsData={bazaarData} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;