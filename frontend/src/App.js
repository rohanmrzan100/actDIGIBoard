import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import Navbar from "./components/nav/Navbar";
import SideNav from "./components/nav/SideNav";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./components/utils/Spinner";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./store/slice/authSlice";
import Content from "./components/content/Content";
import Devices from "./components/devices/Devices";
import Add from "./components/devices/Add";
const App = () => {
  const dispatch = useDispatch();
  const navToggle = useSelector((state) => state.toggle.navToggle);
  const isloading = useSelector((state) => state.utils.isloading);
  if (localStorage.getItem("token")) {
    dispatch(loadUser(localStorage.getItem("token")));
  }
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {navToggle && <SideNav />}
        <div className="md:w-[80%] w-full m-auto  h-full p-6">
          <Routes>
            {["/", "/signin"].map((path) => (
              <Route key={path} path={path} element={<Signin />} />
            ))}
            <Route path="/signup" element={<Signup />}></Route>

            <Route path="/content" element={<Content />}></Route>
            <Route path="/devices" element={<Devices />}></Route>
            <Route path="/add_device" element={<Add />}></Route>
            {/* <Route path={`/devices/${uid}/info`}  element={<DeviceInfo />}></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
      {isloading && <Spinner />}
      <ToastContainer />
    </div>
  );
};

export default App;
