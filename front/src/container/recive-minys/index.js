// Recive_minus.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
// import FieldFormMinus from '../../co/field-form-minus'; // Обновленный импорт
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import FieldFormMinus from '../../component/field-form_two';

export default function Recive_minus({onCreate, email, placeholder, button, id}) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');  
  
  const handleSubmit = ({ value, valueEmail }) => {
      return sendData ({ value, valueEmail });
  };

  const sendData = async (dataToSend) => {
      setStatus(LOAD_STATUS.PROGRESS);

      try{
          const res = await fetch("http://localhost:4000/post-send", {
              method: "POST",
              headers : {
                  "Content-Type" : "application/json",
              },
              body: convertData(dataToSend),
          });

          const data = await res.json();

          if(res.ok) {
              setStatus(null);
              
              if(onCreate) onCreate();
          } else {
              setMessage(data.message); // Исправление опечатки: "messaeg" на "message"
              setStatus(LOAD_STATUS.ERROR)
          }
      } catch(error) {
          setMessage(error.message); // Исправление опечатки: "messaeg" на "message"
          setStatus(LOAD_STATUS.ERROR);
      }
  };

  const convertData = ({ value, valueEmail }) =>
  JSON.stringify({
      text: value,
      username: valueEmail,
      postId: id,
      email: email
  });

  return (
    <FieldFormMinus
      placeholder={placeholder}
      button={button}
      onSubmit={handleSubmit}
    />
  );
}
