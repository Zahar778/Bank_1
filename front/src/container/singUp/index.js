import React, { useState } from 'react';
import './index.css';
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button';
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';

export default function SingUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  class SignupForm extends Form {
    constructor() {
      super();

      this.FIELD_NAME = {
        EMAIL: 'email',
        PASSWORD: 'password',
      };

      this.FIELD_ERROR = {
        IS_EMPTY: 'Введіть значення в поле',
        IS_BIG: 'Дуже довге значення, приберіть зайве',
        EMAIL: 'Введіть коректне значення e-mail адреси',
        PASSWORD:
          'Пароль повинен складатися з не менше ніж 8 символів включаючи хоча б одну цифру, малу та велику літеру',
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
    };

    change = (name, value) => {
      const error = this.validate(name, value);

      this.value[name] = value;

      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    };

    submit = async () => {
      console.log(this.value);
    
      try {
        const res = await fetch('http://localhost:4000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.value[this.FIELD_NAME.EMAIL],
            password: this.value[this.FIELD_NAME.PASSWORD],
          }),
        });
    
        const data = await res.json();
    
        if (res.ok) {
          console.log('Успешный ответ:', data);
        } else {
          console.error('Ошибка ответа:', data);
        }
      } catch (error) {
        console.error('Ошибка запроса:', error);
    
        if (error.response) {
          console.error('Статус ответа:', error.response.status);
          console.error('Тело ответа:', await error.response.json());
        }
      }
    };
  }

  const signupForm = new SignupForm();

  class FieldPassword {
    static toggle = (target) => {
      target.toggleAttribute('show');

      const input = target.previousElementSibling;
      const type = target.getAttribute('type');
      if (type === 'password') {
        input.setAttribute('type', 'text');
      } else {
        input.setAttribute('type', 'password');
      }
    };
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const SingIn = () => {
    navigate('/singIn');
  };

  return (
    <div className="body page page--background">
      <BackButton />
      <div>
        <div className="title_singUp">
          <div className="title_culm">
            <h1 className="h1">Sing Up</h1>
            <p className="deckripton">Choose a registration method</p>
          </div>
        </div>
        <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> Email</div>
                <label className="field__label"></label>
                <input
                  onInput={(e) => signupForm.change(e.target.name, e.target.value)}
                  className="field__input validation"
                  name={signupForm.FIELD_NAME.EMAIL}
                  placeholder="Email"
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
                    onInput={(e) => signupForm.change(e.target.name, e.target.value)}
                    className="field__input validation"
                    name={signupForm.FIELD_NAME.PASSWORD}
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                  />
                  <span
                    onClick={(e) => {
                      FieldPassword.toggle(e.target.previousElementSibling);
                      toggleShowPassword();
                    }}
                    className={`field__icon ${showPassword ? 'show' : ''}`}
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="p">
            <p className="description">Already have an account? </p>
            <p className="link" onClick={SingIn}>
              Sign In
            </p>
          </div>
        </form>
        <div className="suuces_button ">
          <Button text={'Continue'} type={Button} onClick={signupForm.submit} />
        </div>
        <div className='alert_flex'>
          <span className={`alert ${errors.email || errors.password ? "alert--error" : "" }`}>{errors.email || errors.password }</span>
          <span className={` ${errors.email || errors.password ? "icon_warning" : "" }`}></span>
        </div>
      </div>
    </div>
  );
}
