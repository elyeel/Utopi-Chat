import React from "react";
import "./Header.scss";

import { Avatar } from "@material-ui/core";
import HistoryIcon from '@material-ui/icons/History';

import SearchIcon from '@material-ui/icons/Search';

import ToggleOffIcon from '@material-ui/icons/ToggleOff';
// import ToggleOnIcon from '@material-ui/icons/ToggleOn';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="header__avatar"
          alt="Eric Ho"
          src=""
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
        <ExitToAppIcon />
      </div>
    </div>
  )
}

export default Header;
