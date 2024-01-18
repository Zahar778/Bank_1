import React, { useState } from 'react';
import './index.css';
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button';
import { Form, REG_EXP_EMAIL, REG_EXP_PASSWORD } from '../../script/form';
import { saveSession } from '../../script/session';

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [errors_two ] = useState({})

  class SettingsForm extends Form {
    constructor() {
      super();

      this.FIELD_NAME = {
        EMAIL: 'email',
        PASSWORD: 'password',
        NEWEMAIL: 'newEmail',
        NEWPASSWORD: 'newPassword'
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

  //   submit = async () => {
  //     if (this.disabled === true) {
  //       this.validateAll();
  //     } else {
  //       try {
  //         const res = await fetch('http://localhost:4000/settings', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             email: this.value[this.FIELD_NAME.EMAIL],
  //             newEmail: this.value[this.FIELD_NAME.NEWEMAIL],
  //             password: this.value[this.FIELD_NAME.PASSWORD],
  //           }),
  //         });
    
  //         if (res.status === 200) {
  //           const data = await res.json();
  //           console.log('Успешный ответ:', data.message);
  //           saveSession(data.session);
  //           AuthRoute(); // Предполагается, что AuthRoute - это функция для перенаправления
  //         } else if (res.status === 400) {
  //           const data = await res.json();
  //           console.error('Ошибка ответа:', data.message);
  //           setErrors({ [this.FIELD_NAME.PASSWORD]: data.message });
  //         } else {
  //           console.error('Ошибка ответа:', res.statusText);
  //           setErrors({ [this.FIELD_NAME.PASSWORD]: 'Ошибка сервера' });
  //         }
  //       } catch (error) {
  //         console.error('Ошибка запроса:', error);
  //         setErrors({ [this.FIELD_NAME.PASSWORD]: 'Ошибка запроса' });
  //       }
  //     }
  //   };
  //   submit_two = async () => {
  //     if (this.disabled === true) {
  //       this.validateAll();
  //     } else {
  //       try {
  //         const res = await fetch('http://localhost:4000/settings_password', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             newPassword: this.value[this.FIELD_NAME.NEWPASSWORD],
  //             password: this.value[this.FIELD_NAME.PASSWORD],
  //           }),
  //         });
    
  //         if (res.status === 200) {
  //           const data = await res.json();
  //           console.log('Успешный ответ:', data.message);
  //           saveSession(data.session);
  //           AuthRoute(); // Предполагается, что AuthRoute - это функция для перенаправления
  //         } else if (res.status === 400) {
  //           const data = await res.json();
  //           console.error('Ошибка ответа:', data.message);
  //           setErrors({ [this.FIELD_NAME.PASSWORD]: data.message });
  //         } else {
  //           console.error('Ошибка ответа:', res.statusText);
  //           setErrors({ [this.FIELD_NAME.PASSWORD]: 'Ошибка сервера' });
  //         }
  //       } catch (error) {
  //         console.error('Ошибка запроса:', error);
  //         setErrors({ [this.FIELD_NAME.PASSWORD]: 'Ошибка запроса' });
  //       }
  //     }
  //   };

  //   validateAll = () => {
  //     Object.values(this.FIELD_NAME).forEach((name) => {
  //       const error = this.validate(name, this.value[name]);

  //       if (error) {
  //         this.setError(name, error);
  //       }
  //     });
  //   };
  //   validateAll_two = () => {
  //     Object.values(this.FIELD_NAME.PASSWORD || this.FIELD_NAME.NEWPASSWORD).forEach((name) => {
  //       const error = this.validate(name, this.value[name]);

  //       if (error) {
  //         this.setError(name, error);
  //       }
  //     });
  //   };
  
  // }
  // const AuthRoute = () => {
  //   navigate('/AuthRoute');
  // };
  // const settingsForm = new SettingsForm();

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  // const config = async () => {
  //   // Proceed with validation
  //   settingsForm.validateAll();
  
  //   // Check for validation errors
  //   const formErrors = settingsForm.getErrors();
  
  //   // If there are errors, update the state and prevent form submission
  //   if (formErrors && Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //   } else {
  //     try {
  //       // Only submit the form to the server if validation passes
  //       await settingsForm.submit();
  //     } catch (error) {
  //       console.error('Ошибка при отправке формы:', error);
  //       // Handle errors during form submission
  //     }
  //   }
  // };

  // const config_two = async () => {
  //   // Proceed with validation
  //   settingsForm.validateAll_two();
  
  //   // Check for validation errors
  //   const formErrors = settingsForm.getErrors();
  
  //   // If there are errors, update the state and prevent form submission
  //   if (formErrors && Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //   } else {
  //     try {
  //       // Only submit the form to the server if validation passes
  //       await settingsForm.submit_two();
  //     } catch (error) {
  //       console.error('Ошибка при отправке формы:', error);
  //       // Handle errors during form submission
  //     }
  //   }
  // };

  submit = async () => {
    try {
      const res = await fetch('http://localhost:4000/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.value[this.FIELD_NAME.EMAIL],
          newEmail: this.value[this.FIELD_NAME.NEWEMAIL],
          password: this.value[this.FIELD_NAME.PASSWORD],
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log('Успешный ответ:', data.message);
        saveSession(data.session);
        balance()
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

  submit_two = async () => {
    console.log(this.value)
    try {
      const res = await fetch('http://localhost:4000/settings_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: this.value[this.FIELD_NAME.NEWPASSWORD],
          password: this.value[this.FIELD_NAME.PASSWORD],
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log('Успешный ответ:', data.message);
        saveSession(data.session);
       balance() // Предполагается, что AuthRoute - это функция для перенаправления
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
  validateAll_two = () => {
      Object.values(this.FIELD_NAME.PASSWORD || this.FIELD_NAME.NEWPASSWORD).forEach((name) => {
        const error = this.validate(name, this.value[name]);

        if (error) {
          this.setError(name, error);
        }
      });
    };
}

const balance = () => {
  navigate('/balance');
};
const settingsForm = new SettingsForm();

const toggleShowPassword = () => {
  setShowPassword(!showPassword);
};

const config = async () => {
  // Proceed with validation
  settingsForm.validateAll();

  // Check for validation errors
  const formErrors = settingsForm.getErrors();

  // Always submit the form to the server
  try {
    await settingsForm.submit();
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    // Handle errors during form submission
  }

  // Update the state with validation errors if any
  if (formErrors && Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
  }
};

const config_two = async () => {
  // Proceed with validation
  settingsForm.validateAll_two();

  // Check for validation errors
  const formErrors = settingsForm.getErrors();

  // Always submit the form to the server
  try {
    await settingsForm.submit_two();
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    // Handle errors during form submission
  }

  // Update the state with validation errors if any
  if (formErrors && Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
  }
};


    

  return (
    <div className="body page page--background">
      <BackButton />
      <div>
        <div className="title_singUp">
          <div className="title_culm">
            <h1 className="h1">Settings</h1>
          </div>
        </div>
        <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title_setings"> Change email</div>
                <div className="field__title"> Email</div>
                <label className="field__label"></label>
                <input
                  onInput={(e) => settingsForm.change(e.target.name, e.target.value)}
                  className={`field__input validation ${errors[settingsForm.FIELD_NAME.EMAIL] ? 'validation--error' : ''}`}
                  name={settingsForm.FIELD_NAME.EMAIL}
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
                    onInput={(e) => settingsForm.change(e.target.name, e.target.value)}
                    className={`field__input validation ${errors[settingsForm.FIELD_NAME.PASSWORD] ? 'validation--error' : ''}`}
                    name={settingsForm.FIELD_NAME.PASSWORD}
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
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title"> New Email</div>
                <label className="field__label"></label>
                <input
                  onInput={(e) => settingsForm.change(e.target.name, e.target.value)}
                  className={`field__input validation ${errors[settingsForm.FIELD_NAME.NEWEMAIL] ? 'validation--error' : ''}`}
                  name={settingsForm.FIELD_NAME.NEWEMAIL}
                  placeholder="Ваш e-mail"
                  type="email"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="suuces_button ">
          <Button text={'Save Email'} type={"transparent"} onClick={config} />
        </div>
        <div className="alert_flex">
          <span
            className={`form__error ${errors[settingsForm.FIELD_NAME.PASSWORD] ? 'form__error--active' : 'icon_warning'}`}
            name={settingsForm.FIELD_NAME.PASSWORD}
          >
            {errors[settingsForm.FIELD_NAME.PASSWORD]}
          </span>
          <span
            className={`form__error ${errors[settingsForm.FIELD_NAME.EMAIL] ? 'form__error--active' : 'icon_warning'}`}
            name={settingsForm.FIELD_NAME.EMAIL}
          >
            {errors[settingsForm.FIELD_NAME.EMAIL]}
          </span>
        </div>
        <form className="page__section">
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title_setings"> Change password</div>
                <div className="field__title field__title_we"> Old Password</div>
                <div className="icon">
                  <input
                    onInput={(e) => settingsForm.change(e.target.name, e.target.value)}
                    className={`field__input validation ${errors[settingsForm.FIELD_NAME.PASSWORD] ? 'validation--error' : ''}`}
                    name={settingsForm.FIELD_NAME.PASSWORD}
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
          <div className="form">
            <div className="form__item">
              <div className="field">
                <div className="field__title field__titel_password"> New password</div>
                <div className="icon">
                  <input
                    onInput={(e) => settingsForm.change(e.target.name, e.target.value)}
                    className={`field__input validation ${errors[settingsForm.FIELD_NAME.NEWPASSWORD] ? 'validation--error' : ''}`}
                    name={settingsForm.FIELD_NAME.NEWPASSWORD}
                    placeholder="New password"
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
        </form>
        <div className="suuces_button ">
          <Button text={'Save Password'} type={"transparent"} onClick={config_two} />
        </div>
        <div className="alert_flex">
          <span
            className={`form__error ${errors_two[settingsForm.FIELD_NAME.PASSWORD] ? 'form__error--active' : 'icon_warning'}`}
            name={settingsForm.FIELD_NAME.PASSWORD}
          >
            {errors[settingsForm.FIELD_NAME.PASSWORD]}
          </span>
          <span
            className={`form__error ${errors[settingsForm.FIELD_NAME.EMAIL] ? 'form__error--active' : 'icon_warning'}`}
            name={settingsForm.FIELD_NAME.EMAIL}
          >
            {errors[settingsForm.FIELD_NAME.EMAIL]}
          </span>
      </div>
    </div>
    </div>
  );
}
