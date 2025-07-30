import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/context/LanguageContext";
import Layout from "./components/layout/Layout";
import PSBALoader from "./components/common/PSBALoader";
import BazaarLocator from "./components/home/BazaarLocator";
import bazaarData from "../BazaarData";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import Dashboard from "./components/pages/Dashboard/Dashboard";

// Lazy-loaded page components
const Home = React.lazy(() => import("./components/pages/Home"));
const About = React.lazy(() => import("./components/pages/About"));
const Initiatives = React.lazy(() => import("./components/pages/Initiatives"));
const InitiativeDetail = React.lazy(() =>
  import("./components/initiatives/InitiativeDetail")
);
// const Achievements = React.lazy(() =>
//   import("./components/layout/Achievements")
// );
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
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PSBALoader />;
  }

  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Suspense fallback={<PSBALoader />}>
            <Routes>
              <Route path="/" element={<Home data={excelData?.Home} />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/initiatives" element={<Initiatives />} />
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
              <Route
                path="//notices-notifications"
                element={<NoticesNotifications />}
              />

              <Route
                path="/initiatives/:id"
                element={<InitiativeDetail />}
              />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/contact" element={<Contact data={<Contact />} />} />
              <Route
                path="/our-bazaars"
                element={<BazaarLocator bazaarsData={bazaarData} />}
              />
              {/* <Route
                path="/our-bazaars/:bazaarSlug"
                element={<BazaarDetailPage />}
              /> */}

              {/* <Route path="/" element={isLoggedIn ? <Dashboard user={user} /> : <Navigate to="/login" />} /> */}
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />

              {/* Redirect any unknown paths to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
