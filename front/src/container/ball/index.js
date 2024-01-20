import React, { useState, useEffect } from 'react';
import './index.css';
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button';
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession, getSession } from '../../script/session';

export default function Ball() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(null);

  useEffect(() => {
    const session = getSession();
    if (session && session.user && session.user.isConfirm) {
      setIsLoggedIn(true);
      setLoginTime(new Date(session.timestamp));
    }
  }, []);

  const formatTimeAgo = (time) => {
    if (!time) {
      return "Unknown time";
    }

    const date = new Date(time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${hours}:${minutes}`; 

    if (formattedDate < 60) {
      return `${minutes} min. ago`;
    } else {
      const hoursAgo = Math.floor(minutes / 60);
      return `${hoursAgo} min. ago`;
    }
  };

  return (
    <div className="body page page--background">
      <BackButton />
      <div>
        <div className="title_singUp">
          <div className="title_culm">
            <h1 className="h1">Notifications</h1>
          </div>
        </div>
        {isLoggedIn && (
          <div className='Notifications'>
            <div className="logged-in-message"></div>
            <div className='pis'>
              <p className='content_ball'>You are logged in.</p>
              <div className='text_p'>
                <p>{formatTimeAgo(new Date() - 10 * 60 * 1000)}ㅤ• </p> <p>ㅤAnnouncement</p>
              </div>
            </div>
          </div>
        )}
        <div className='Notifications'>
          <div className="warr-in-message"></div>
          <div className='pis'>
            <p className='content_ball'>New login</p>
            <div className='text_p'>
              <p>{formatTimeAgo(new Date() - 10 * 60 * 1000)}ㅤ• </p> <p>ㅤWarning</p>
            </div>
          </div>
        </div>
        <div className='Notifications'>
          <div className="logged-in-message"></div>
          <div className='pis'>
            <p className='content_ball'>New reward system</p>
            <div className='text_p'>
              <p>{formatTimeAgo(new Date() - 15 * 60 * 1000)}ㅤ• </p> <p>ㅤAnnouncement</p>
            </div>
          </div>
        </div>
        <div className='Notifications'>
          <div className="warr-in-message"></div>
          <div className='pis'>
            <p className='content_ball'>New login</p>
            <div className='text_p'>
              <p>{formatTimeAgo(new Date() - 20 * 60 * 1000)}ㅤ• </p> <p>ㅤWarning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
