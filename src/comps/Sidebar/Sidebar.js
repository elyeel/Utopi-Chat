import React, { useState, useEffect } from "react";
import FlagSelectionModal from '../FlagSelectionModal/FlagSelectionModal';
import StatBox from '../StatBox/StatBox';
import "./Sidebar.scss";

// Material Icons
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecordRounded";
import CommentIcon from "@material-ui/icons/Comment";
import SidebarOption from "../SidebarOption/SidebarOption";
import MarkunreadMailboxIcon from "@material-ui/icons/MarkunreadMailbox";
import TvIcon from "@material-ui/icons/Tv";
import LanguageIcon from "@material-ui/icons/Language";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";


function Sidebar({ cookies, language, setFlag, currChannel, setCurrChannel, db }) {
  const [channels, setChannels] = useState([]);
  const [languageModal, setLanguageModal] = useState(false);

  useEffect(() => {
    // snapshot of channels collection
    db.collection("channels").onSnapshot((snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      );
    });
  }, [db]);

  return (
    <div className="sidebar">
      {languageModal &&
        <FlagSelectionModal
          isOpen={languageModal}
          closeModal={()=>setLanguageModal(false)}
          language={language}
          setFlag={setFlag}
          db={db}
          cookies={cookies}
        />
      }
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>UtopiChat</h2>
          <h3>
            <FiberManualRecordIcon/>
            {cookies.user.name}
          </h3>
        </div>
        <SidebarOption Icon={LanguageIcon} changeLanguage={()=>setLanguageModal(true)}/>
      </div>
      <StatBox/>
      <SidebarOption
        Icon={AddIcon}
        addChannelOption={true}
        title="Add Channel"
      />

      {/* Connet to db and list all the channels */}
      {channels.map((channel) => {
        return (
          <SidebarOption
            key={channel.id}
            title={channel.name}
            id={channel.id}
            currChannel={currChannel}
            setCurrChannel={setCurrChannel}
            cookies={cookies}
            db={db}
          />
        );
      })}
    </div>
  );
}

export default Sidebar;