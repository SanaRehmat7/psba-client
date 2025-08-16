import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { LanguageProvider } from "./components/context/LanguageContext";
import PSBALoader from "./components/common/PSBALoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Unauthorized from "./components/pages/Unauthorized";
import BazaarView from "./components/pages/Dashboard/Bazaar-view";

import DashboardLayout from "./components/Privatedashboard/layout/DashboardLayout";
import PriceUpdateForm from "./components/Privatedashboard/pages/PriceUpdateForm";
// import Reports from "./components/Privatedashboard/pages/Reports";
import PendingApprovals from "./components/Privatedashboard/pages/PendingApproval";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// Layout includes header/footer
import Layout from "./components/layout/Layout";
import BazaarLocator from "./components/home/BazaarLocator";
import bazaarData from "../BazaarData";
import NewBazaarForm from "./components/pages/Dashboard/NewBazaarForm";
import UpdatePriceForm from "./components/pages/Dashboard/UpdatePricePage";
import ReportsPage from "./components/pages/Dashboard/ReportsPage";
import UpdatePricesPage from "./components/pages/Dashboard/UpdatePricePage";

// Lazy-loaded pages
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
const DistrictDashboard = React.lazy(() =>
  import("./components/pages/Dashboard/DistrictDashboard")
);
const AdminDashboard = React.lazy(() =>
  import("./components/pages/Dashboard/AdminDashboard")
);

// Separate wrapper to avoid Layout for auth routes
const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  console.log(isAuthPage);

  return (
    <>
      <ToastContainer />
      <Suspense fallback={<PSBALoader />}>
        <Routes>
          {/* Auth pages outside layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with Layout */}
          {!isAuthPage && (
            <Route
              path="*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/initiatives" element={<Initiatives />} />
                    <Route
                      path="/initiatives/:id"
                      element={<InitiativeDetail />}
                    />
                    <Route
                      path="/download-app"
                      element={<PSBAAppDownloadPage />}
                    />
                    <Route path="/helping-rti" element={<RtiHelpline />} />
                    <Route path="/psba-gallery" element={<Gallery />} />
                    <Route path="/yearly-progress" element={<YrProgress />} />
                    <Route
                      path="/code-of-conduct"
                      element={<CodeOfConduct />}
                    />
                    <Route
                      path="/annual-accounts"
                      element={<AnnualAccounts />}
                    />
                    <Route path="/procurement" element={<Procurement />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/journey" element={<JourneyYear />} />
                    <Route path="/faqs" element={<Faqs />} />
                    <Route
                      path="/notices-notifications"
                      element={<NoticesNotifications />}
                    />
                    <Route
                      path="/achievements"
                      element={<AchievementsPage />}
                    />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                      path="/our-bazaars"
                      element={<BazaarLocator bazaarsData={bazaarData} />}
                    />
                    {/* Protected district admin routes */}
                    <Route element={<PrivateRoute roles={["district"]} />}>
                      <Route element={<DashboardLayout />}>
                        <Route
                          path="/dashboard"
                          element={<DistrictDashboard />}
                        />
                        <Route
                          path="/bazaars/new"
                          element={<NewBazaarForm />}
                        />
                        <Route path="/bazaars/:id" element={<BazaarView />} />
                        <Route
                          path="/update-prices"
                          element={
                            <PrivateRoute roles={["district"]}>
                              <UpdatePricesPage />
                            </PrivateRoute>
                          }
                        />
                        <Route
                          path="/update-price/:bazaarId/:priceIndex"
                          element={
                            <PrivateRoute roles={["district"]}>
                              <UpdatePriceForm />
                            </PrivateRoute>
                          }
                        />
                        {/* <Route path="/reports" element={<ReportsPage />} /> */}
                      </Route>
                    </Route>

                    {/* Protected super admin routes */}
                    <Route element={<AdminRoute />}>
                      <Route
                        path="/admin-dashboard"
                        element={<AdminDashboard />}
                      />
                      <Route
                        path="/pending-approvals"
                        element={<PendingApprovals />}
                      />
                    </Route>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                    <Route path="*" element={<Navigate to="Not-Found 404" />} />
                  </Routes>
                </Layout>
              }
            />
          )}
        </Routes>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LanguageProvider>
  );
}

export default App;
