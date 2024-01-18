import {useState, userState} from "react";
import Banck_Button from "../bank_button";
import BackButtonTwo from '../bank_button_two'
import { useNavigate } from "react-router-dom";
import './index.css';




export default function FieldForm ({placeholder, button, onSubmit}){
    const navigate = useNavigate();

    const balance = () => {
     navigate('/balance');
    };
    const [value, setValue] = useState("");

    const handleChange = (e) => setValue(e.target.value);

    const handleSubmit = () => {
        if (value.length === 0) return null;

       if(onSubmit) {
        onSubmit(value);
        balance()
    }else {
        throw new Error('OnSubmit porps is undefiend')
    }

        setValue("");
    };

    const isDisabled = value.length === 0;

    return (
        <div className="field-form ">
            <input
            onChange={handleChange}
            value={value}
            rows={2}
            type="number"
            placeholder={placeholder}
            className="field-form__field field__input_o"
            ></input>
      <div className="field__title_mini"> Payment system</div>

            <div onClick={handleSubmit} username={"Stripe"}>
            <Banck_Button
            
            disabled={isDisabled}
            className="field-form__button"
            >
                {button}
            </Banck_Button>
            </div>
            <div className="button_banck" onClick={handleSubmit} username={"Coinbase"}>
            <BackButtonTwo
            
            disabled={isDisabled}
            className="field-form__button bunk_option_two"
            >
                {button}
            </BackButtonTwo>
            </div>
             
        </div>
        
    )
}