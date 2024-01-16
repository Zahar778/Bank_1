import React, { useState } from 'react';
import './index.css';
import BackButton from '../../component/button_back';
import Button from '../../component/button';
import { Form, REG_EXP_EMAIL } from '../../script/form';
import { useNavigate } from 'react-router-dom';

export default function RecoveryFormComponent() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const Recovery_confirm = () => {
    navigate('/recovery-confirm');
  };

  class RecoveryForm extends Form {
    constructor() {
      super();

      this.FIELD_NAME = {
        EMAIL: 'email',
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
      
      return null;
    };

    getErrors = () => {
      return this.error;
    };

    submit = async () => {
      try {
        const res = await fetch('http://localhost:4000/recovery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: convertData(),
        });
    
        if (res.status === 200) {
          const data = await res.json();
          console.log('Успешный ответ:', data);
          setErrors({ [this.FIELD_NAME.EMAIL]: data.message });
          return Recovery_confirm()
        } else if (res.status === 400) {
          const data = await res.json();
          console.error('Ошибка ответа:', data);
          setErrors({ [this.FIELD_NAME.EMAIL]: data.message });
        } else {
          console.error('Ошибка ответа:', res.statusText);
        }
      } catch (e) {
        console.error('Ошибка запроса:', e);
      }
    };

    validateAll = () => {
      Object.values(this.FIELD_NAME).forEach((name) => {
        const error = this.validate(name, this.value[name]);

        if (error) {
          this.setError(name, error);
        }
      });
    };
  }

  const recoveryForm = new RecoveryForm();

  const convertData = () => {
    return JSON.stringify({
      [recoveryForm.FIELD_NAME.EMAIL]: recoveryForm.value[recoveryForm.FIELD_NAME.EMAIL],
    });
  };

  return (
    <div className="body page page--background">
      <BackButton />
      <div>
        <div className="title_singUp">
          <div className="title_culm">
            <h1 className="h1">Recover password</h1>
            <p className="deckripton">Choose a recovery method</p>
          </div>
        </div>
        <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> Email</div>
                <label className="field__label"></label>
                <input
                  onInput={(e) => recoveryForm.change(e.target.name, e.target.value)}
                  className={`field__input validation ${errors[recoveryForm.FIELD_NAME.EMAIL] ? 'validation--error' : ''}`}
                  name={recoveryForm.FIELD_NAME.EMAIL}
                  placeholder="Ваш e-mail"
                  type="email"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="suuces_button">
          <Button text={'Send code'} type={Button} onClick={recoveryForm.submit} />
        </div>
        <div className="alert_flex">
          <span
            className={`form__error ${errors[recoveryForm.FIELD_NAME.EMAIL] ? 'form__error--active' : 'icon_warning'}`}
            name={recoveryForm.FIELD_NAME.EMAIL}
          >
            {errors[recoveryForm.FIELD_NAME.EMAIL]}
          </span>
        </div>
      </div>
    </div>
  );
}
