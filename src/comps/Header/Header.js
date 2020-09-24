import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.scss";

import Avatar from "@material-ui/core/Avatar";
import HistoryIcon from "@material-ui/icons/History";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';


import SearchIcon from "@material-ui/icons/Search";

import ToggleOffIcon from "@material-ui/icons/ToggleOff";
// import ToggleOnIcon from '@material-ui/icons/ToggleOn';

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { auth } from "../../firebase";

function Header({ setCookie, removeCookie, cookies, db, currChannel }) {
  const history = useHistory();
  // log out function, erase user id from channel users
  const logOut = function (e) {
    if (currChannel) {

      db.collection("channelUsers")
        .doc(currChannel)
        .get()
        .then((doc) => {
          const arrUsers = doc.data().users;
          db.collection("channelUsers")
            .doc(currChannel)
            .update({ users: arrUsers.filter((e) => e !== cookies.user.id) });
        });
    }
    auth
      .signOut()
      .then(() => {
        removeCookie("user");
        console.log("logged out!");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  console.log(cookies);

  return (
    <div className="header">
      <div className="header__left">
        {/* <Avatar
          className="header__avatar"
          alt={cookies.user.name ? cookies.user.name : "Eric Ho"}
          src={cookies.user.picture}
        /> */}
        <IconButton>
          <HomeIcon onClick={()=>history.push('/')}/>
        </IconButton>

        {/* <HistoryIcon /> */}
      </div>

      {/* <div className="header__search">
        <SearchIcon />

        <input placeholder="Search for a channel" />
      </div> */}
    <div className='header-logo-box'>
        <h1 className='header-logo'>
          Utopi-Chat
        </h1>
        <h2 className='header-motto'>🌍🌎🌏</h2>
      </div>

      <div className="header__right">
        {/* night-mode icon */}
        {/* <IconButton>
          <ToggleOffIcon className="header__right--toggle" />
        </IconButton> */}

        {/* log out */}
        <IconButton onClick={logOut}>
          <ExitToAppIcon  />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;