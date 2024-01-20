// FieldFormMinus.js
import React, { useState } from "react";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import './index.css';

export default function FieldFormMinus({ placeholder, button, onSubmit }) {
    const navigate = useNavigate();

    const balance = () => {
        navigate('/balance');
    };

    const [value, setValue] = useState("");
    const [valueEmail, setValueEmail] = useState('');

    const handleChange = (e) => setValue(e.target.value);
    const handleChangeEmail = (e) => setValueEmail(e.target.value);

    const handleSend = () => {
        if (value.length === 0 || valueEmail.length === 0) return null;

        if (onSubmit) {
            onSubmit({ value, valueEmail }); // Передаем объект с обоими значениями
            balance();
        } else {
            throw new Error('onSubmit prop is undefined');
        }

        setValue("");
        setValueEmail("");
    };

    const isDisabled = value.length === 0 || valueEmail.length === 0;

    return (
        <div className="field-form">
            <input
                onChange={handleChangeEmail}
                value={valueEmail}
                rows={2}
                type="email"
                placeholder="Email"
                className="field-form__field field__input_o"
            />
            <input
                onChange={handleChange}
                value={value}
                rows={2}
                type="number"
                placeholder={placeholder}
                className="field-form__field field__input_o"
            />

            <div onClick={handleSend}>
                <Button
                    text={"Continue"}
                    disabled={isDisabled}
                    className="field-form__button"
                > {button}</Button>
            </div>
        </div>
    );
}
