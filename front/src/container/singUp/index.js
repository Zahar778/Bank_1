import React from 'react';
import "./index.css"
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';  
import Button from '../../component/button';
import {
    Form,
    REG_EXP_EMAIL,
    REG_EXP_PASSWORD,
  } from '../../script/form'
import { useLocation } from 'react-router-dom';
import { saveSession } from '../../script/session'

export default function SingUp () {
    const navigate = useNavigate()
    const SingIn = () => {
        navigate('/singIn');
      };

      const location = useLocation();
      
      class SignupForm extends Form {
        FIELD_NAME = {
          EMAIL: 'email',
          PASSWORD: 'password',
          PASSWORD_AGAIN: 'passwordAgain',
          ROLE: 'role',
          IS_CONFIRM: 'isConfirm',
        }
      
        FIELD_ERROR = {
          IS_EMPTY: 'Введіть значення в поле',
          IS_BIG: 'Дуже довге значення, приберіть зайве',
          EMAIL: 'Введіть коректне значення e-mail адреси',
          PASSWORD:
            'Пароль повинен складатися з не менше ніж 8 символів, включаючи хоча б одну цифру, малу та велику літеру',
          PASSWORD_AGAIN:
            'Ваш другий пароль не збігається з першим',
          NOT_CONFIRM: 'Ви не погоджуєтесь з правилами',
          ROLE: 'Ви не обрали роль',
        }
      
        validate = (name, value) => {
          if (String(value).length < 1) {
            return this.FIELD_ERROR.IS_EMPTY
          }
      
          if (String(value).length > 20) {
            return this.FIELD_ERROR.IS_BIG
          }
      
          if (name === this.FIELD_NAME.EMAIL) {
            if (!REG_EXP_EMAIL.test(String(value))) {
              return this.FIELD_ERROR.EMAIL
            }
          }
      
          if (name === this.FIELD_NAME.PASSWORD) {
            if (!REG_EXP_PASSWORD.test(String(value))) {
              return this.FIELD_ERROR.PASSWORD
            }
          }
      
          if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
            if (
              String(value) !==
              this.value[this.FIELD_NAME.PASSWORD]
            ) {
              return this.FIELD_ERROR.PASSWORD_AGAIN
            }
          }
      
          if (name === this.FIELD_NAME.ROLE) {
            if (isNaN(value)) {
              return this.FIELD_ERROR.ROLE
            }
          }
      
          if (name === this.FIELD_NAME.IS_CONFIRM) {
            if (Boolean(value) !== true) {
              return this.FIELD_ERROR.NOT_CONFIRM
            }
          }
        }
      
        submit = async () => {
          if (this.disabled === true) {
            this.validateAll()
          } else {
            console.log(this.value)
      
            this.setAlert('progress', 'Завантаження...')
      
            try {
              const res = await fetch('/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: this.convertData(),
              })
      
              const data = await res.json()
      
              if (res.ok) {
                this.setAlert('success', data.message)
                saveSession(data.session)
                location.assign('/')
              } else {
                this.setAlert('error', data.message)
              }
            } catch (error) {
              this.setAlert('error', error.message)
            }
          }
        }
      
        convertData = () => {
          return JSON.stringify({
            [this.FIELD_NAME.EMAIL]:
              this.value[this.FIELD_NAME.EMAIL],
            [this.FIELD_NAME.PASSWORD]:
              this.value[this.FIELD_NAME.PASSWORD],
          })
        }
      }
      
      window.signupForm = new SignupForm()

    return ( 
        <div className='body page page--background'>
            <BackButton />
            <div>
            <div className='title_singUp'>
                <div className='title_culm'>
                <h1 className='h1'>Sing Up</h1>
                <p className='deckripton'>Choose a registration method</p>
                </div>
            </div>
            <form className='page__section'>
            <div className="form"> 
            <div className="form__item">
                <div className='field'>
                    <div className='field__title'> Email</div>
                    <label  className='field__label'></label>
                    <input  className='field__input validation' placeholder='Email' type='email' ></input>
                </div>
            </div>
            </div>
            <div className="form"> 
            <div className="form__item">
                <div className='field'>
                    <div className='field__title field__titel_password'> Password</div>
                    <div className='icon'>
                    <label  className='field__label'></label>
                    <input  className='field__input validation' placeholder='Password' type='password'></input>
                    <span onclick="fieldPassword.toggle(this)" class="field__icon"></span>
                </div>
                </div>
            </div>
            </div>
            <div className='p'>
               <p className='description'>Already have an account? </p>
               <p className='link' onClick={SingIn}>Sign In</p>
            </div>
            </form>
            <div className='suuces_button'>
            <Button text={"Continue"} onClick={SignupForm.submit}></Button>
            </div>
        </div>

        
        </div>
    )
}
