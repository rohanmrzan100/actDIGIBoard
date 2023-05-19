import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Landing from "./components/landing/Landing";
import Navbar from "./components/nav/Navbar";
import SideNav from "./components/nav/SideNav";
import { useSelector } from "react-redux";
const App = () => {
  const navToggle = useSelector(state=>state.toggle.navToggle)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
   {navToggle &&    <SideNav/> }       <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/" element={<Landing />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
