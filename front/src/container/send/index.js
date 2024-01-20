// import React, { useState } from 'react';
// import './index.css';
// import BackButton from '../../component/button_back';
// import { useNavigate } from 'react-router-dom';
// import Button from '../../component/button';
// import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
// import { saveSession } from '../../script/session';

// export default function Send() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const balance = () => {
//     navigate('/balance')
//   }

//   class SendUpForm extends Form {
//     constructor() {
//       super();

//       this.FIELD_NAME = {
//         EMAIL: 'email',
//         SUM: 'sum',
//       };

//       this.FIELD_ERROR = {
//         IS_EMPTY: 'Введіть значення в поле ',
//         IS_BIG: 'Дуже довге значення, приберіть зайве ',
//         EMAIL: 'Введіть коректне значення e-mail адреси ',
//       };

//       this.value = {};
//     }

//     validate = (name, value) => {
//       if (String(value).length < 1) {
//         return this.FIELD_ERROR.IS_EMPTY;
//       }
//       if (String(value).length > 20) {
//         return this.FIELD_ERROR.IS_BIG;
//       }

//       if (name === this.FIELD_NAME.EMAIL) {
//         if (!REG_EXP_EMAIL.test(String(value))) {
//           return this.FIELD_ERROR.EMAIL;
//         }
//       }
//     };

//     getErrors = () => {
//       return this.error;
//     };

//     submit = async () => {
//       console.log("submit вызвался ")
//       if (this.disabled === true) {
//         this.validateAll()
//       } else {
//         console.log(this.value)
       
//       try {
//         const res = await fetch('http://localhost:4000/post-send', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             email: this.value[this.FIELD_NAME.EMAIL],
//             sum: this.value[this.FIELD_NAME.SUM],
//           }),
//         });

//         if (res.status === 200) {
//           const data = await res.json();
//           console.log('Успешный ответ:', data.value );
//           saveSession(data.session)
//           return balance();
//         } else if (res.status === 400) {
//           const data = await res.json();
//           console.error('Ошибка ответа:', data.message);
//         } else {
//           console.error('Ошибка ответа:', res.statusText);
//         }
//       } catch (error) {
//         console.error('Ошибка запроса:', error);
//       }
//     };
//   } 

//     validateAll = () => {
//       Object.values(this.FIELD_NAME).forEach((name) => {
//         const error = this.validate(name, this.value[name]);
//         console.log("validateAll тоже вызвался и если ты это ивлишь то вырнул true")

//         if (error) {
//           this.setError(name, error);
//           console.log("validateAll тоже вызвался и если ты это ивлишь то вырнул error")
//         }else {
          
//         }
//       });
//     };
//   }

//   const config = async () => {
//     // Proceed with validation
//     sendUpForm.validateAll();

//     // Check for validation errors
//     const formErrors = sendUpForm.getErrors();

//     // If there are errors, update the state and prevent form submission
//     if (formErrors && Object.keys(formErrors).length > 0) {
//       setErrors(formErrors);
//     } else {
//       try {
//         // Only submit the form to the server if validation passes
//         await sendUpForm.submit();
//         console.log("форма отправленна")
//       } catch (error) {
//         console.error('Ошибка при отправке формы:', error);
//         // Handle errors during form submission
//       }
//     }
//   };

//   const sendUpForm = new SendUpForm();

  
//   return (
//     <div className='balance_body'>
//       <div className='Header_recive'>
//         <BackButton />
//       </div>

//       <div className='title_recive_flex'>
//         <div className='title_recive'>Send</div>
//       </div>
//       <form className="page__section">
//           <div className="form">
//             <div className="form__item">
//               <div className="field">
//                 <div className="field__title"> Email</div>
//                 <label className="field__label"></label>
//                 <input
//                   onInput={(e) => sendUpForm.change(e.target.name, e.target.value)}
//                   className={`field__input validation ${errors[sendUpForm.FIELD_NAME.EMAIL] ? 'validation--error' : ''}`}
//                   name={sendUpForm.FIELD_NAME.EMAIL}
//                   placeholder="Ваш e-mail"
//                   type="email"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="form">
//             <div className="form__item">
//               <div className="field">
//                 <div className="field__title field__titel_password"> Password</div>
//                 <div className="icon">
//                   <label className="field__label"></label>
//                   <input
//                     onInput={(e) => sendUpForm.change(e.target.name, e.target.value)}
//                     className={`field__input validation ${errors[sendUpForm.FIELD_NAME.SUM] ? 'validation--error' : ''}`}
//                     name={sendUpForm.FIELD_NAME.SUM}
//                     placeholder="100$"
//                     type={"number"}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//         <div className="suuces_button ">
//           <Button text={'Continue'} type={Button} onClick={() => config()} />
//         </div>
//         <div className="alert_flex">
//           <span
//             className={`form__error ${errors[sendUpForm.FIELD_NAME.EMAIL] ? 'form__error--active' : 'icon_warning'}`}
//             name={sendUpForm.FIELD_NAME.EMAIL}
//           >
//             {errors[sendUpForm.FIELD_NAME.EMAIL]}
//           </span>
//     </div>
//     </div>
//   );
// }





import React from 'react';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import "./index.css";
import BackButton from '../../component/button_back';
import Recive_create from '../recive-create';
import { Alert, Skeleton, LOAD_STATUS } from '../../component/load';
import { getDate } from '../../util/getDate'
import { useState } from 'react';
import Recive_minus from '../recive-minys';

export default function Recive() {
  const [status, setStatus] = useState(null);
  const [messaeg, setMessage] = useState('');
  const [data, setData] = useState(null);



  const getData = async () => {
    setStatus(LOAD_STATUS.PROGRESS);
    try {
        const res = await fetch("http://localhost:4000/post-list");
        const data = await res.json();

        if(res.ok) {
            setData(convertData(data));
            setStatus(LOAD_STATUS.SUCCESS);
        } else {
            setMessage(data.messaeg);
            setStatus(LOAD_STATUS.ERROR);
        }
    } catch (error) {
        setMessage(error.messaeg)
        setStatus(LOAD_STATUS.ERROR);
    }
};
const convertData = (raw) => ({
  list: raw.list.reverse().map(({id,username,text,date}) =>({
      id,
      username,
      text,
      date: getDate(date),
  })),
  isEmpty: raw.list.length === 0,
});

if(status === null) {
  getData();
}

  return (
   <div className='balance_body'>
    <BackButton />

    <div className='Header_recive'>
    
    <div className='title_recive_flex'>
   <div className='title_recive'>Send</div>
   </div>
   <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> Send amount</div>
                <label className="field__label"></label>
                <Recive_minus
                onCreate={getData}
                placeholder="Sum"
                
                />
              </div>
            </div>
          </div>
   </form>

</div>

</div>
);
}

