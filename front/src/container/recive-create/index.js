import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import "./index.css";
import BackButton from '../../component/button_back';
import FieldForm from '../../component/field-form';
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from 'react';

export default function Recive_create({onCreate, email, placeholder, button, id}) {
  const [status, setStatus] = useState(null);
  const [messaeg, setMessage] = useState('');  
  
  const handeSubmit = (value) => {
      return sendData ({value});
    };
    const handeSubmit_two = (value) => {
      return sendData_two ({value});
    };
    // const handleSend = (value) => {
    //   return sendDataSend ({value});
    // };

    const sendData = async (dataToSend) => {
      setStatus(LOAD_STATUS.PROGRESS);

      try{
          const res = await fetch("http://localhost:4000/post-create", {
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
          }else {
              setMessage(data.messaeg);
              setStatus(LOAD_STATUS.ERROR)
          }
      } catch(error) {
          setMessage(error.messaeg);
          setStatus(LOAD_STATUS.ERROR);
      }
  };
  const sendData_two = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try{
        const res = await fetch("http://localhost:4000/post-create_two", {
            method: "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body: convertData_two(dataToSend),
        });

        const data = await res.json();

        if(res.ok) {
            setStatus(null);
            
            if(onCreate) onCreate();
        }else {
            setMessage(data.messaeg);
            setStatus(LOAD_STATUS.ERROR)
        }
    } catch(error) {
        setMessage(error.messaeg);
        setStatus(LOAD_STATUS.ERROR);
    }
};
// const sendDataSend = async (dataToSend) => {
//   setStatus(LOAD_STATUS.PROGRESS);

//   try{
//       const res = await fetch("http://localhost:4000/post-send", {
//           method: "POST",
//           headers : {
//               "Content-Type" : "application/json",
//           },
//           body: convertData_two(dataToSend),
//       });

//       const data = await res.json();

//       if(res.ok) {
//           setStatus(null);
          
//           if(onCreate) onCreate();
//       }else {
//           setMessage(data.messaeg);
//           setStatus(LOAD_STATUS.ERROR)
//       }
//   } catch(error) {
//       setMessage(error.messaeg);
//       setStatus(LOAD_STATUS.ERROR);
//   }
// };
  const convertData = ({value}) =>
  JSON.stringify({
      text: value,
      username: "Stripe",
      postId: id,
  });
  const convertData_two = ({value}) =>
  JSON.stringify({
      text: value,
      username: "Coinbase",
      postId: id,
  });
  // const convertSend = ({value}) =>
  // JSON.stringify({
  //     sum: value,
  //     email: email,
  //     postId: id,
  // });

  return (

   <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <FieldForm 
                  placeholder={placeholder}
                  button={button}
                  onSubmit={handeSubmit}
                  onSubmit_two={handeSubmit_two}
                  // onSubmit_send={handleSend}

                />
              </div>
            </div>
          </div>

   </form>

);
  }
