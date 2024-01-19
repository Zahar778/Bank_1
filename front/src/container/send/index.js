import React, { useState, useEffect } from 'react';
import './index.css';
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';

import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession, getSession } from '../../script/session';

import Button from '../../component/button';

export default function Send() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  class SendUpForm extends Form {
    constructor() {
      super();

      this.FIELD_NAME = {
        EMAIL: 'email',
        SUM: 'sum',
      };

      this.FIELD_ERROR = {
        IS_EMPTY: 'Введіть значення в поле ',
        IS_BIG: 'Дуже довге значення, приберіть зайве ',
        EMAIL: 'Введіть коректне значення e-mail адреси ',
     
      };

      this.value = {};
    }

    validate = (name, value) => {
      if (String(value).length < 1) {
        return this.FIELD_ERROR.IS_EMPTY;
      }
      if (String(value).length > 20) {
        return this.FIELD_ERROR.IS_BIG;
      }

      if (name === this.FIELD_NAME.EMAIL) {
        if (!REG_EXP_EMAIL.test(String(value))) {
          return this.FIELD_ERROR.EMAIL;
        }
      }

      if (name === this.FIELD_NAME.PASSWORD) {
        if (!REG_EXP_PASSWORD.test(String(value))) {
          return this.FIELD_ERROR.PASSWORD;
        }
      }
      return null;
    };

    getErrors = () => {
      return this.error;
    };

    submit = async () => {
      if (this.disabled === true) {
        this.validateAll()
      } else {
        console.log(this.value)
       
      try {
        const res = await fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.value[this.FIELD_NAME.EMAIL],
            password: this.value[this.FIELD_NAME.PASSWORD],
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log('Успешный ответ:', data.message);
          saveSession(data.session)
        } else if (res.status === 400) {
          const data = await res.json();
          console.error('Ошибка ответа:', data.message);
          setErrors({ [this.FIELD_NAME.PASSWORD]: data.message });
        } else {
          console.error('Ошибка ответа:', res.statusText);
          setErrors({ [this.FIELD_NAME.PASSWORD]: 'Ошибка сервера' });
        }
      } catch (error) {
        console.error('Ошибка запроса:', error);
        setErrors({ [this.FIELD_NAME.PASSWORD]: 'Ошибка запроса' });
      }
    };
  } 

    validateAll = () => {
      Object.values(this.FIELD_NAME).forEach((name) => {
        const error = this.validate(name, this.value[name]);

        if (error) {
          this.setError(name, error);
        }
      });
    };
  }

  const sendUpForm = new SendUpForm();


  const config = async () => {
    // Proceed with validation
    sendUpForm.validateAll();

    // Check for validation errors
    const formErrors = sendUpForm.getErrors();

    // If there are errors, update the state and prevent form submission
    if (formErrors && Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        // Only submit the form to the server if validation passes
        await sendUpForm.submit();
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        // Handle errors during form submission
      }
    }
  };

  return (
    <div className='balance_body'>
      <div className='Header_recive'>
    <BackButton />
    </div>
        
        <div className='title_recive_flex'>
       <div className='title_recive'>Send</div>
       </div>
       <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> Email</div>
                <label className="field__label"></label>
                <input
                  onInput={(e) => sendUpForm.change(e.target.name, e.target.value)}
                  className={`field__input validation ${errors[sendUpForm.FIELD_NAME.EMAIL] ? 'validation--error' : ''}`}
                  name={sendUpForm.FIELD_NAME.EMAIL}
                  placeholder="Ваш e-mail"
                  type="email"
                />
              </div>
            </div>
          </div>
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title field__titel_password"> Sum</div>
                <div className="icon">
                  <label className="field__label">$ </label>
                  <input
                    onInput={(e) => sendUpForm.change(e.target.name, e.target.value)}
                    className={`field__input validation ${errors[sendUpForm.FIELD_NAME.PASSWORD] ? 'validation--error' : ''}`}
                    name={sendUpForm.FIELD_NAME.SUM}
                    placeholder="Sum"
                    type="number"  
                  />
                </div>
              </div>
            </div>
          </div>
          <span
            className={`form__error ${errors[sendUpForm.FIELD_NAME.EMAIL] ? 'form__error--active' : 'icon_warning'}`}
            name={sendUpForm.FIELD_NAME.EMAIL}
          >
            {errors[sendUpForm.FIELD_NAME.EMAIL]}
          </span>
        </form>
        <div className="suuces_button ">
          <Button text={'Continue'} type={Button} onClick={config} />
        </div>
       </div>
  )
}
