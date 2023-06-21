import React from "react";
import {
  faBars,
  faCalendarDays,
  faPhotoFilm,
  faSquarePollVertical,
  faTableColumns,
  faTablet,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navToggle } from "../../store/slice/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slice/authSlice";
import logo from "../../assets/Logo.png"
const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  return (
    <div>
      <nav className="  bg-gradient-to-r  from-blue-700 to-blue-800 ">
        <div className="w-full   flex flex-wrap items-center justify-between mx-auto  px-8 py-1">
          <a href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold   whitespace-nowrap text-white">
              <img src={logo} alt="logo" className="h-16" />
              {/* <h1>ACT Dsign</h1> */}
            </span>
          </a>
          {isAuth && (
            <>
              <button
                onClick={() => dispatch(navToggle())}
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex border border-white items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 active:scale-110"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <FontAwesomeIcon icon={faBars} className="scale-125" />
              </button>
              <div
                className="hidden w-full lg:block lg:w-auto"
                id="navbar-default"
              >
                <ul className="font-medium flex justify-center items-center space-x-2">
                  <li>
                    <button
                      onClick={() => navigate("/content")}
                      type="button"
                      className="w-full  nav-btn"
                    >
                      <FontAwesomeIcon icon={faPhotoFilm} />
                      <span className="ml-3">Content</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/devices")}
                      type="button"
                      className="w-full  nav-btn"
                    >
                      <FontAwesomeIcon icon={faTablet} />
                      <span className="ml-3">Devices</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/interactive")}
                      type="button"
                      className="w-full  nav-btn"
                    >
                      <FontAwesomeIcon icon={faPhotoFilm} />
                      <span className="ml-3">Interactive</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/devices")}
                      type="button"
                      className="w-full  nav-btn"
                    >
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <span className="ml-3">Scheduling</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="w-full  nav-btn">
                      <FontAwesomeIcon icon={faTableColumns} />
                      <span className="ml-3">Dashboard</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="w-full  nav-btn">
                      <FontAwesomeIcon icon={faSquarePollVertical} />
                      <span className="ml-3">Report</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/signin");
                        dispatch(logout());
                      }}
                      className="w-full  nav-btn"
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span className="ml-3">Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>{" "}
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
