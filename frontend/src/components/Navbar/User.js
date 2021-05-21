import React, { useState } from "react";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import * as FaIcons from "react-icons/fa";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "../../api/auth";

const User = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signout();
    window.location.reload();
  };
  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <FaIcons.FaUserAlt size={25} />
      </Button>
      {/* When user is Already Logged in */}

      {isAuthenticated() && (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <Link to="/profile">
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Link>

          <Link to="/">
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Link>
        </Menu>
      )}

      {/* When user is not  Logged in */}

      {!isAuthenticated() && (
        <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <Link to="/login">
            <MenuItem onClick={handleClose}>Login</MenuItem>
          </Link>
          <Link to="/signup">
            <MenuItem onClick={handleClose}>Sign up</MenuItem>
          </Link>
        </Menu>
      )}
    </>
  );
};

export default User;
