import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import "./index.css";

export default function Balance() {
let balance = 30000
  return (
    <header className="header_balance  wellcomePage">
      <div className='header_balance_gradient'>
     <div className='header_icon'>
      <div className='settings' onClick={'привет'} ></div>
      <div className='header_title'>Main wallet</div>
      <div className='bell' onClick={'привет'} ></div>
     </div>
     <div className='balance'>{balance}</div>
     </div>
    </header>
  );
}
