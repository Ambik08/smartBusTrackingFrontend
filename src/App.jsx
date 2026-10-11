import React from "react";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SendingLocation from "./pages/SendingLocation.jsx";
import DashboardPage from "./pages/DashboardPage.jsx"
import RoutePage from "./pages/RoutePage.jsx";
// import AddBusPage from "./component/AddBusPage.jsx";
import BusLoginPage from "./pages/BusLoginPage.jsx";
import BusDashboard from "./pages/BusDashboard.jsx"
import UserPage from "./pages/UserPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AllUsersLoginPage from "./pages/DriverORAdminORUserLoginPage.jsx"
import RouteStops from "./pages/StopsPage.jsx"
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import OrganisationEntry from "./pages/OrganisationEntry.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/location" element={<SendingLocation/>} />
        <Route path="/dashboard/:orgName" element={<DashboardPage/>} />
        <Route path="/route/:routeNumber" element={<RoutePage/>}/>
        {/* <Route path="/bus/:routeNumber" element={<AddBusPage/>} /> */}
        <Route path="/bus/login" element={<BusLoginPage/>} />
        <Route path="/busDashboard/:id" element={<BusDashboard/>} />
        <Route path="/:orgName" element={<UserPage/>} />
        <Route path="/admin/login" element={<AdminLoginPage/>} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage/>} />
        <Route path="/allLogin" element={<AllUsersLoginPage/>} />
        <Route path="/route/:routeNumber/stops" element={<RouteStops/>}/>
        <Route path="/" element={<OrganisationEntry/>}/>
      </Routes>
    </>
  );
}

export default App;