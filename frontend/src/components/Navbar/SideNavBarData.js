import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";

const flag = isAuthenticated();

const SideNavBarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    flag: true,
  },
  {
    title: "About Us",
    path: "/about",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    flag: true,
  },
  {
    title: "Create a office",
    path: "/goToOffice",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    flag: flag,
  },
  {
    title: "Join As Employee",
    path: "/joinAsEmployee",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
    flag: flag,
  },
];

export default SideNavBarData;
