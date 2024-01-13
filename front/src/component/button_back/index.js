import React from 'react';
import { useNavigate } from 'react-router-dom';  
import "./index.css"

export default function BackButton() {
  const navigate = useNavigate();  

  const handleBackClick = () => {
    navigate(-1);  
  };

  return (
    <div className='back_button' onClick={handleBackClick}></div>
  );
}
