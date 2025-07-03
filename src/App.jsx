import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import About from "./pages/aboutus.jsx";
import Contact from "./pages/contact.jsx";
import Home from "./pages/home.jsx";
import Team from "./pages/team.jsx";
import AtHomeRepair from "./services/AtHomeRepair.jsx";
import PeriodicServicing from "./services/PeriodicServicing.jsx";
import GoToTop from "./components/GoToTop.jsx";
import { ThemeProvider } from "styled-components";
import Booking from "./pages/booking.jsx";
import OnSite from "./booking/OnSite.jsx";
import WorkshopRepair from "./booking/WorkshopRepair.jsx";
import Honda from "./WorkshopDetail/Honda.jsx";
import AslamAutos from "./WorkshopDetail/AslamAutos.jsx";
import FirstStop from "./WorkshopDetail/FirstStop.jsx";
import Hyundai from "./WorkshopDetail/Hyundai.jsx";
import Ibrahim from "./WorkshopDetail/Ibrahim.jsx";
import Kia from "./WorkshopDetail/Kia.jsx";
import SharifMotors from "./WorkshopDetail/SharifMotors.jsx";
import Suzuki from "./WorkshopDetail/Suzuki.jsx";
import Toyota from "./WorkshopDetail/Toyota.jsx";
import RoadsideAssistance from "./services/RoadsideAssistance.jsx";
import AslamDashboard from "./components/WorkshopDashboards/AslamDashboard.jsx";
import OilChange from "./services/OilChange.jsx";
import LoginWorkshop from "./components/Login/LoginWorkshop.jsx";
import LoginUser from "./components/Login/LoginUser.jsx";
import Emergency from "./components/Emergency/Emergency.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Cart from "./components/Cart.jsx"; // Import the Cart component
import Address from "./components/Address.jsx";
import ViewDetail from './components/ViewDetail.jsx';
import CartWorkshopRepair from './components/CartWorkshopRepair.jsx';
import AddressWorkshopRepair from "./components/AddressWorkshopRepair.jsx";
import ViewLocation from './components/ViewLocation'; // path adjust karo
import UserSettings from './components/UserSettings'; // Adjust path if needed
import BatteryService from "./services/BatteryServices.jsx";
import BrakeService from "./services/BrakeService.jsx";
import CoolantChange from "./services/CoolantChange.jsx";
import SuspensionReplacement from "./services/SuspensionReplacement.jsx";
import TireService from "./services/TireServices.jsx";
import Tuning from "./services/Tuning.jsx";
import WorkshopProfile from './components/WorkshopProfile';

function App() {
  const theme = {
    colors: {
      btn: "#007bff",
      shadow: "rgba(0, 0, 0, 0.2)",
    },
    media: {
      mobile: "600px",
    },
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />

            {/* Consolidated booking routes */}
            <Route path="/booking" element={<Booking />} />
            <Route path="/onsite" element={<OnSite />} />
            <Route path="/workshopRepair" element={<WorkshopRepair />} />

            {/* Remove duplicate routes */}
            {/* <Route path="/bookings" element={<Booking />} /> */}
            {/* <Route path="/bookings/onSite" element={<OnSite />} /> */}
            {/* <Route path="/bookings/workshopRepair" element={<WorkshopRepair />} /> */}
            {/* <Route path="/onSite" element={<OnSite />} /> */}

            <Route path="/RoadsideAssistance" element={<RoadsideAssistance />} />
            <Route path="/AtHomeRepair" element={<AtHomeRepair />} />
            <Route path="/PeriodicServicing" element={<PeriodicServicing />} />
            <Route path="/oilChange" element={<OilChange />} />
            <Route path="/battery-service" element={<BatteryService />} />
            <Route path="/brake-service" element={<BrakeService />} />
            <Route path="/coolant-change" element={<CoolantChange />} />\
            <Route path="/suspension-replacement" element={<SuspensionReplacement />} />
            <Route path="/tire-services" element={<TireService />} />
            <Route path="/Tuning" element={<Tuning />} />
            <Route path="/honda" element={<Honda />} />
            <Route path="/aslamAutos" element={<AslamAutos />} />
            <Route path="/firstStop" element={<FirstStop />} />
            <Route path="/hyundai" element={<Hyundai />} />
            <Route path="/ibrahimAutos" element={<Ibrahim />} />
            <Route path="/kia" element={<Kia />} />
            <Route path="/sharifMotors" element={<SharifMotors />} />
            <Route path="/suzuki" element={<Suzuki />} />
            <Route path="/toyota" element={<Toyota />} />
            <Route path="/aslam-dashboard" element={<AslamDashboard />} />

            <Route path="/pages/home" element={<Home />} />

            {/* Login routes */}
            <Route path="/login/loginUser" element={<LoginUser />} />
            <Route path="/login/workshop" element={<LoginWorkshop />} />
            <Route path="/login/user" element={<LoginUser />} />

            <Route path="/emergency" element={<Emergency />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/address" element={<Address />} />
            <Route path="/view-detail" element={<ViewDetail />} />
            <Route path="/cart-workshop-repair" element={<CartWorkshopRepair />} />
            <Route path="/address-workshop-repair" element={<AddressWorkshopRepair />} />
            <Route path="/dashboard/aslam" element={<AslamDashboard />} />
            <Route path="/" element={<AslamDashboard />} /> 
            <Route path="/view-location/:userId" element={<ViewLocation />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/workshop-profile" element={<WorkshopProfile />} />
            <Route path="/aslam-dashboard" element={<AslamDashboard />} />
          </Routes>
          <GoToTop />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;