import './index.css';
import BackButton from '../../component/button_back';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/button';
import { Form } from '../../script/form';
import {
  saveSession,
  getTokenSession,
} from '../../script/session';

export default function SignupConfirm() {
  const navigate = useNavigate();

  const AuthRoute = () => {
    navigate('/AuthRoute');
  };

  class SignupConfirmForm extends Form {
    constructor() {
      super();

      this.FIELD_NAME = {
        CODE: 'code',
      };

      this.FIELD_ERROR = {
        IS_EMPTY: 'Введіть значення в поле ',
        IS_BIG: 'Дуже довге значення, приберіть зайве ',
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
    };

    submit = async () => {
      if (this.disabled === true) {
        this.validateAll();
      } else {
        console.log(this.value);

        try {
          const res = await fetch('http://localhost:4000/signup-confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: this.convertData(),
          });

          const data = await res.json();

          if (res.ok) {
            saveSession(data.session);
            AuthRoute();
          } else {
            // Handle error case here
          }
        } catch (error) {
          // Handle network or other errors here
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

    convertData = () => {
      return JSON.stringify({
        [this.FIELD_NAME.CODE]: Number(this.value[this.FIELD_NAME.CODE]),
        token: getTokenSession(),
      });
    };
  }

  const signupConfirm = new SignupConfirmForm();

  return (
    <div className="body page page--background">
      <BackButton />
      <div>
        <div className="title_singUp">
          <div className="title_culm">
            <h1 className="h1">Confirm account</h1>
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
                  onInput={(e) => signupConfirm.change(e.target.name, e.target.value)}
                  className={`field__input `}
                  name={signupConfirm.FIELD_NAME.CODE}
                  placeholder="Code"
                  type="number"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="suuces_button ">
          <Button text={'Confirm'} type={Button} onClick={() => signupConfirm.submit()} />
        </div>
      </div>
    </div>
  );
}
