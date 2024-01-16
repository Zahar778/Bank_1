import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import "./index.css";

export default function Headers({ text, type }) {
  const navigate = useNavigate();

  const SingUpp = () => {
    navigate('/singUp');
  };
  const SingIn = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div>
        <div className="title">
          <h1 className="title_header">Hello!</h1>
          <h2 className="title_deckription">Welcome to bank app</h2>
        </div>
        
        <img  className="background_imggg"></img>
        <img  className="background_gradient" ></img>
        <img src="./svg/header_background_two.svg" className="bitcoin_img" ></img>
      </div>
      <div className="button_title">
        
        <Button text={"Sign Up"} onClick={SingUpp} />
        <Button text={"Sign In"} type={'transparent'} onClick={SingIn} />
      </div>
    </header>
  );
}
