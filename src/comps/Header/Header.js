import React from "react";
import "./Header.scss";

import { Avatar } from "@material-ui/core";
import HistoryIcon from '@material-ui/icons/History';

import SearchIcon from '@material-ui/icons/Search';

import ToggleOffIcon from '@material-ui/icons/ToggleOff';
// import ToggleOnIcon from '@material-ui/icons/ToggleOn';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {auth} from '../../firebase';

function Header({setCookie,removeCookie,cookies}) {
  const logOut = function (e) {
    auth.signOut()
    .then(() => {
      removeCookie("user")
      console.log("logged out!");
    })
    .catch((error) => {
      alert(error.message)
    })
  }

  console.log(cookies);

  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="header__avatar"
          alt={cookies.user.name ? cookies.user.name : "Eric Ho"}
          src={cookies.user.picture}
        />

        <HistoryIcon />
      </div>

      <div className="header__search">
        <SearchIcon />

        <input placeholder="Search for a channel" />
      </div>

      <div className="header__right">
        {/* night-mode icon */}
        <ToggleOffIcon className="header__right--toggle"/>

        {/* log out */}
        <ExitToAppIcon 
          onClick={logOut}
        />
      </div>
    </div>
  )
}

export default Header;
