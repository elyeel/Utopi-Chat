import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from '../Message/Message';
import ChatForm from '../ChatForm/ChatForm';

import './Chat.scss';

function Chat({ db }) {
  const { channelId } = useParams();

  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  
  useEffect(()=> {
    updateScroll();
  }, [channelMessages])
  // fetch all details from current channel
  
  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .onSnapshot((snapshot) => setChannelDetails(snapshot.data()));
    }
    // fetch all messages from current channel
    db.collection('channels')
      .doc(channelId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setChannelMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [channelId, db]);

  const updateScroll = () => {
    const chatBox = document.getElementById('chat__messages');
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <div className='chat__headerLeft'>
          <h4 className='chat__channelName'>
            <strong>#{channelDetails?.name}</strong>
            <StarBorderOutlinedIcon />
          </h4>
        </div>

        <div className='chat__headerRight'>
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
        <div id='chat__messages' className='chat__messages'>
          {channelMessages.map(({ id, message, timestamp, user, userimage }) => (
            <Message
            key={id}
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userimage}
            />
            ))}
        </div>

        <div className='chat__form'>
          <ChatForm
            db={db}
            channelId={channelId}
            channelName={channelDetails?.name}
          />
        </div>
    </div>
  );
}

export default Chat;
