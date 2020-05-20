import React, { useState, useRef } from "react";
import './formInput.css';

const FormInput = ({value, type, name, className, placeholder, onChangeFn, onFocusFn, onBlurFn, formattingFn
        , validationFn=(value)=>true, inValidText}) => {
    const [validFlg, changeValidFlg] = useState(true); 
    const [inValidValueText, changeInValidValueText]=useState('');
    const inputRef = useRef();
 
    const validation = (value) => {
        console.log(validationFn(value));
        if (!validationFn(value)) changeInValidValueText(inValidText||"Incorrect value");
        return validationFn(value);
    };


    const defaultValidation = function (value) {
        if (!Boolean(value)) changeInValidValueText("Enter something in this field");
        return Boolean(value);
    };

    const formatting = formattingFn || function (value) {return value};


    const defaultOnFocus = () => {
        inputRef.current.select();
        changeValidFlg(true);
    };

    const defaultOnBlur = () => {
        defaultValidation(value) && validation(value) ? changeValidFlg(true) : changeValidFlg(false);
    };

    return (<div>
                <input value={value} type={type} name={name} placeholder={placeholder} 
                    onChange={(event) => {onChangeFn(name, formatting(event.target.value)); }}
                    onFocus={onFocusFn || defaultOnFocus} 
                    onBlur={onBlurFn || defaultOnBlur}
                    onSubmit={()=> console.log(value)}
                    className={className + " formInput"}
                    ref={inputRef} />

                {validFlg || <span>{inValidValueText}</span> }
            </div>

        );
};

export {FormInput};