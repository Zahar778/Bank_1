import React, { useState } from 'react';
import './index.css';
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button';
import { Form, REG_EXP_PASSWORD } from '../../script/form';

export default function RecoveryConfirm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const recovery = () => {
    navigate('/recovery')
  }
  class RecoveryForm extends Form {
    constructor() {
      super();

      this.FIELD_NAME = {
        CODE: 'code',
        PASSWORD: 'password',
      };

      this.FIELD_ERROR = {
        IS_EMPTY: 'Введіть значення в поле ',
        IS_BIG: 'Дуже довге значення, приберіть зайве ',
        PASSWORD:
          'Пароль повинен складатися з не менше ніж 8 символів включаючи хоча б одну цифру, малу та велику літеру ',
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
      console.log(this.value);

      try {
        const res = await fetch('http://localhost:4000/recovery-confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: convertData(),
        });

        if (res.status === 200) {
          const data = await res.json();
          console.log('Успешный ответ:', data);
          setErrors({ [this.FIELD_NAME.CODE]: data.message });
          return recovery()
        } else if (res.status === 400) {
          const data = await res.json();
          console.error('Ошибка ответа:', data);
          setErrors({ [this.FIELD_NAME.PASSWORD]: data.message });
        } else {
          console.error('Ошибка ответа:', res.statusText);
        }
      } catch (error) {
        console.error('Ошибка запроса:', error);
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

  const config = async () => {
    // Proceed with validation
    recoveryForm.validateAll();

    // Check for validation errors
    const formErrors = recoveryForm.getErrors();

    // If there are errors, update the state and prevent form submission
    if (formErrors && Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        // Only submit the form to the server if validation passes
        await recoveryForm.submit();
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        // Handle errors during form submission
      }
    }
  };

  const convertData = () => {
    return JSON.stringify({
      [recoveryForm.FIELD_NAME.CODE]: Number(recoveryForm.value[recoveryForm.FIELD_NAME.CODE]),
      [recoveryForm.FIELD_NAME.PASSWORD]: recoveryForm.value[recoveryForm.FIELD_NAME.PASSWORD],
    });
  };

  return (
    <div className="body page page--background">
      <BackButton />
      <div>
        <div className="title_singUp">
          <div className="title_culm">
            <h1 className="h1">Recover password</h1>
            <p className="deckripton">Write the code you received</p>
          </div>
        </div>
        <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> Code</div>
                <label className="field__label"></label>
                <input
                  onInput={(e) => recoveryForm.change(e.target.name, e.target.value)}
                  className={`field__input validation ${errors[recoveryForm.FIELD_NAME.CODE] ? 'validation--error' : ''}`}
                  name={recoveryForm.FIELD_NAME.CODE}
                  placeholder="Code"
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title field__titel_password"> Password</div>
                <div className="icon">
                  <label className="field__label"></label>
                  <input
                    onInput={(e) => recoveryForm.change(e.target.name, e.target.value)}
                    className={`field__input validation ${errors[recoveryForm.FIELD_NAME.PASSWORD] ? 'validation--error' : ''}`}
                    name={recoveryForm.FIELD_NAME.PASSWORD}
                    placeholder="New password"
                    type={showPassword ? 'text' : 'password'}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="suuces_button ">
          <Button text={'Restore password'} type={Button} onClick={config} />
        </div>
        <div className="alert_flex">
          <span
            className={`form__error ${errors[recoveryForm.FIELD_NAME.PASSWORD] ? 'form__error--active' : 'icon_warning'}`}
            name={recoveryForm.FIELD_NAME.PASSWORD}
          >
            {errors[recoveryForm.FIELD_NAME.PASSWORD]}
          </span>
          <span
            className={`form__error ${errors[recoveryForm.FIELD_NAME.CODE] ? 'form__error--active' : 'icon_warning'}`}
            name={recoveryForm.FIELD_NAME.CODE}
          >
            {errors[recoveryForm.FIELD_NAME.CODE]}
          </span>
        </div>
      </div>
    </div>
  );
}
