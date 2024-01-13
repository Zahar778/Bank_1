import React from 'react';
import { useNavigate } from 'react-router-dom';  
import SingUpp from '../singUp';
import Button from '../../component/button';
import "./index.css";

export default function Headers({ text, type }) {
  const navigate = useNavigate();

  const SingUpp = () => {
    navigate('/singUp');
  };

  return (
    <header className="header">
      <div>
        <div className="title">
          <h1 className="title_header">Hello!</h1>
          <h2 className="title_deckription">Welcome to bank app</h2>
        </div>
        <img src="./svg/header_background.svg" className="background_img" alt="background"></img>
        <img src="./svg/header_background_two.svg" className="bitcoin_img" alt="bitcoin"></img>
      </div>
      <div className="button_title">
        <Button text={"Sing Up"} onClick={SingUpp} />
        <Button text={"Sign In"} type={'transparent'} />
      </div>
    </header>
  );
}
