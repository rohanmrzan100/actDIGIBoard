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
import Add from "./components/devices/AddDevicePage";
import DeviceInfo from "./components/devices/device info/DeviceInfo";
import DeviceAddMedia from "./components/devices/device info/DeviceAddMedia";
import ErrorPage from "./components/utils/ErrorPage";
import Playlist from "./components/content/playlist/Playlist";
import Preview from "./components/content/playlist/PlaylistPreview";
import AddPlaylist from "./components/devices/device info/addPlaylist";
const App = () => {
  const dispatch = useDispatch();
  const navToggle = useSelector((state) => state.toggle.navToggle);
  const isloading = useSelector((state) => state.utils.isloading);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const _id = useSelector((state) => state.device.device_id);
  const p_id = useSelector((state) => state.utils.playlist_id);
  if (localStorage.getItem("token")) {
    dispatch(loadUser(localStorage.getItem("token")));
  }

  const device_id = _id || localStorage.getItem("device");
const playlist_id = p_id || localStorage.getItem("playlist")
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {navToggle && <SideNav />}
        <div className="md:w-[80%]   w-full m-auto  h-full p-6">
          <Routes>
            {!isAuth && (
              <>
                {["/", "/signin"].map((path) => (
                  <Route key={path} path={path} element={<Signin />} />
                ))}

                <Route path="/signup" element={<Signup />}></Route>
              </>
            )}
            {isAuth && (
              <>
                {["/", "/content"].map((path) => (
                  <Route key={path} path={path} element={<Content />} />
                ))}
                <Route path="/signin" element={<Signin />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/devices" element={<Devices />}></Route>
                <Route path="/add_device" element={<Add />}></Route>
                <Route path="/create/playlist" element={<Playlist />}></Route>
                <Route path="/device/playlist/add" element={<AddPlaylist />}></Route>
                <Route
                  path={`/playlist/preview/${playlist_id}`}
                  element={<Preview />}
                ></Route>
                <Route
                  path={`/device/${device_id}/info`}
                  element={<DeviceInfo />}
                ></Route>
                <Route
                  path={`/device/${device_id}/add`}
                  element={<DeviceAddMedia />}
                ></Route>
              </>
            )}
            <Route path="/*" element={<ErrorPage />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      {isloading && <Spinner />}
      <ToastContainer />
    </div>
  );
};

export default App;
