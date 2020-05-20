import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { logIn } from "../../actions";
import { withRouter } from "react-router-dom";
import InputField from "../inputField/";
import { withService } from '../hoc';

import './form.css';


function RegForm ({service, logIn, loggedIn, history}) {
    const [fields, changeFields] = useState({
      firstName: {value:'', isValid: true, inValidText: ''},
      phoneNumber: {value:'', isValid: true, inValidText: ''},
      login: {value:'', isValid: true, inValidText: ''},
      password: {value:'', isValid: true, inValidText: ''}
    });

    const setFieldValue = (fieldName, value) => changeFields( (fields) => (
      {...fields, 
        [fieldName]: {...fields[fieldName], value: value}
      }) 
    );
 
    const setIsvalid = (fieldName, isValidValue, inValidTextValue) => changeFields( (fields) => (
      {...fields, 
        [fieldName]: {...fields[fieldName], isValid: isValidValue, inValidText: inValidTextValue}
      }) 
    );

    const onPhoneNumberChange = (event) => {
      //убираем блоки-подсказки
      setIsvalid(event.target.name, true, '');

      let prevValue=fields[event.target.name]['value'];
      let targetValue = event.target.value;
      let value = targetValue;
      let inputSymbol = targetValue.slice(-1);
      const symbolMap = new Map([[1, '('], [5, ')'], [9, '-'], [12, '-']]);
      
      //проверка корректности ввода: только цифры
      if (targetValue.length>prevValue.length && inputSymbol && !inputSymbol.match(/[1-9]/)) {
        console.log(inputSymbol);
        value = targetValue = targetValue.slice(0, -1);
        setIsvalid('phoneNumber', false, "Enter only numbers");
      } else
      //на случай, если последним бэкспейсом остановились на том месте, где должен быть символ из мапы, и начали ввод.
      if (targetValue.length<prevValue.length && symbolMap.has(targetValue.length-1)) {
        console.log('yes -1');
        value = targetValue.slice(0, -1);
      } else
      //если ввод подряд (без бэкспейсов)
      if (targetValue.length>prevValue.length && symbolMap.has(targetValue.length)) {
          value = targetValue + symbolMap.get(targetValue.length);
      };
      
      //ДЛИНА
      if (value[0] == '8' && value.length > 15) {
        setIsvalid('phoneNumber', false, "Value is too long");
      }
  
      setFieldValue('phoneNumber', value);
    };


    const onSubmit = (event) => {
        event.preventDefault();
        if (submitValidation(fields)) {
          let formData = new FormData(event.target);
          service.postRegForm(formData)
            .then( (res) => { 
              console.log(res); 
              logIn();
              history.push('/home'); }
              )
            .catch(() => alert("Something go wrong, try again please"));
        };

    }
    
    const submitValidation = (fields) => {
      let valid = true;
      for (let [key, value] of Object.entries(fields)) {
        if (!value.value) {setIsvalid(key, false, "Enter something in this field"); valid=false};
      };

      return valid;
    }

    return (
        <form className="form"
            onSubmit={onSubmit}>
              <header className="formHeader">Fill the form to register</header>
              <InputField {...fields.firstName} name="firstName" placeholder="Enter your first name" 
                  setFieldValue={setFieldValue}
                  setIsvalid={setIsvalid} />

              <InputField {...fields.phoneNumber} name="phoneNumber" placeholder="Enter your phone number" 
                  setFieldValue={setFieldValue}
                  setIsvalid={setIsvalid} 
                  onchangeFn={onPhoneNumberChange}/>
              
              <InputField {...fields.login} name="login" placeholder="Enter your login" 
                  setFieldValue={setFieldValue}
                  setIsvalid={setIsvalid} 
                  />

              <InputField {...fields.password} name="password" placeholder="Enter your password" 
                  setFieldValue={setFieldValue}
                  setIsvalid={setIsvalid} 
                  />

              <input className="formSubmit" key='submit' type="submit" value="Enter" />
        </form>
    )
}


  
  const mapDispatchToProps = (dispatch) => {
  
    return {
      logIn: () => dispatch(logIn()),
    };
  };

  
  
  export default withService( withRouter( connect((state)=>({...state}), mapDispatchToProps)(RegForm) ));