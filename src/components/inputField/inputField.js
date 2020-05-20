import React from "react";
import './inputField.css';

export default function InputField ({value, isValid, inValidText, name, placeholder, setFieldValue, setIsvalid, onchangeFn, onBlurFn}) {
    
    const onChange = onchangeFn || function (event) {setFieldValue(name, event.target.value); setIsvalid(name, true, '')};
    const onBlur = onBlurFn || function (event) { if (!event.target.value) setIsvalid(name, false, 'Empty value is not alloyed. Enter something, please.')}

    return (
        <div className="inputContainer">
            <input value={value} key={name} name={name} type="text" className="inputField"
                placeholder={placeholder}
                onChange={onChange} 
                onBlur={onBlur}/>
            {isValid || <div className="inValidText">{inValidText}</div>}
        </div>
    )
} 