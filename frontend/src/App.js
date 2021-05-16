import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

import About from "./pages/UserPages/About";
import Home from "./pages/UserPages/Home";
import Profile from "./pages/UserPages/Profile";
import Login from "./pages/UserPages/Login";
import Signup from "./pages/UserPages/Signup";

import EmployerOffice from "./pages/Employer/EmployerOffice";
import EmployerSideRoom from "./pages/Employer/Room/EmployerSideRoom";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import EmployeeSideRoom from "./pages/Employee/Rooms/EmployeeSideRoom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/goToOffice" exact component={EmployerOffice} />
          <Route path="/joinAsEmployee" exact component={EmployeeDashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/about" exact component={About} />
          <Route path="/employerRoom/:roomId" exact component={EmployerSideRoom} />
          <Route path="/employeeRoom/:roomId" exact component={EmployeeSideRoom} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
