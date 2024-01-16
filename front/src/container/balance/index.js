import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import "./index.css";

export default function Balance() {

  return (
    <header className="header">
      <div>
        <div className="title">
          <h1 className="title_header">Hello!</h1>
          <h2 className="title_deckription">Welcome to balance</h2>
        </div>
        <img src="./svg/header_background.svg" className="background_img" alt="background"></img>
        <img src="./svg/header_background_two.svg" className="bitcoin_img" alt="bitcoin"></img>
      </div>
      <div className="button_title">
        
        <Button text={"Sign Up"}  />
        <Button text={"Sign In"} type={'transparent'}  />
      </div>
    </header>
  );
}
