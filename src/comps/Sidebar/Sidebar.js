import React from "react";
import './Sidebar.scss';

// Material Icons
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecordRounded";
import CommentIcon from '@material-ui/icons/Comment';
import SidebarOption from "../../SidebarOption/SidebarOption";
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import TvIcon from '@material-ui/icons/Tv';
import LanguageIcon from '@material-ui/icons/Language';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>UtopiChat</h2>
          <h3>
            <FiberManualRecordIcon />
            Eric Ho
          </h3>
        </div>
        <SidebarOption Icon={LanguageIcon} />
      </div>
      <SidebarOption Icon={TvIcon} title="Joined Channels" />
      <SidebarOption Icon={MarkunreadMailboxIcon} title="Unread Mail" />
      <SidebarOption Icon={LiveTvIcon} title="Browse Channels" />
      <SidebarOption Icon={ExpandLessIcon} title="Show Less"/>
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} title="Add Channel" />

      {/* Connet to db and list all the channels */}

    </div>
  )
}

export default Sidebar;
