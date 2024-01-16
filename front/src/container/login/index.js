import React, { useState, useEffect } from 'react';
import './index.css';
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button';
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession, getSession } from '../../script/session';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  class SignInForm extends Form {
    constructor() {
      super();

      this.FIELD_NAME = {
        EMAIL: 'email',
        PASSWORD: 'password',
      };

      this.FIELD_ERROR = {
        IS_EMPTY: 'Введіть значення в поле ',
        IS_BIG: 'Дуже довге значення, приберіть зайве ',
        EMAIL: 'Введіть коректне значення e-mail адреси ',
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
        this.validateAll();
      } else {
        console.log(this.value);

        try {
          const res = await fetch('http://localhost:4000/login', {
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
            saveSession(data.session);
            return balance();
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

  const signInForm = new SignInForm();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const AuthRoute = () => {
    navigate('/AuthRoute');
  };

  const recovery = () => {
    navigate('/recovery');
  };

  const balance = () => {
    navigate('/balance');
  };

  const config = async () => {
    // Proceed with validation
    signInForm.validateAll();

    // Check for validation errors
    const formErrors = signInForm.getErrors();

    // If there are errors, update the state and prevent form submission
    if (formErrors && Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        // Only submit the form to the server if validation passes
        await signInForm.submit();
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        // Handle errors during form submission
      }
    }
  };

  // useEffect(() => {
  //   try {
  //     const session = getSession();
  //     if (session && session.user.isConfirm) {
  //       AuthRoute();
  //     }
  //   } catch (e) {}
  //     AuthRoute();
  //   });
  

  return (
    <div className="body page page--background">
      <BackButton />
      <div>
        <div className="title_singUp">
          <div className="title_culm">
            <h1 className="h1">Sign in</h1>
            <p className="deckripton">Select login method</p>
          </div>
        </div>
        <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> Email</div>
                <label className="field__label"></label>
                <input
                  onInput={(e) => signInForm.change(e.target.name, e.target.value)}
                  className={`field__input validation ${errors[signInForm.FIELD_NAME.EMAIL] ? 'validation--error' : ''}`}
                  name={signInForm.FIELD_NAME.EMAIL}
                  placeholder="Ваш e-mail"
                  type="email"
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
                    onInput={(e) => signInForm.change(e.target.name, e.target.value)}
                    className={`field__input validation ${errors[signInForm.FIELD_NAME.PASSWORD] ? 'validation--error' : ''}`}
                    name={signInForm.FIELD_NAME.PASSWORD}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                  />

                  <span
                    onClick={toggleShowPassword}
                    className={`field__icon ${showPassword ? 'show' : ''}`}
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="p">
            <p className="description">Forgot your password?</p>
            <p className="link" onClick={recovery}>
              Restore
            </p>
          </div>
        </form>
        <div className="suuces_button ">
          <Button text={'Continue'} type={Button} onClick={config} />
        </div>
        <div className="alert_flex">
          <span
            className={`form__error ${errors[signInForm.FIELD_NAME.PASSWORD] ? 'form__error--active' : 'icon_warning'}`}
            name={signInForm.FIELD_NAME.PASSWORD}
          >
            {errors[signInForm.FIELD_NAME.PASSWORD]}
          </span>
          <span
            className={`form__error ${errors[signInForm.FIELD_NAME.EMAIL] ? 'form__error--active' : 'icon_warning'}`}
            name={signInForm.FIELD_NAME.EMAIL}
          >
            {errors[signInForm.FIELD_NAME.EMAIL]}
          </span>
        </div>
      </div>
    </div>
  );
}
