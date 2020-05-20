import React, { useState } from "react";
import { connect } from "react-redux";
import { logIn } from "../../actions";
import { withRouter } from "react-router-dom";
import { withService } from '../hoc';
import InputField from '../inputField';

import '../regForm/form.css'

function LoginForm ({ service, logIn, loggedIn, history }) {
    const [fields, changeFields] = useState({
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

    const onSubmit = (event) => {
        event.preventDefault();
        if (submitValidation(fields)) {
          let formData = new FormData(event.target);
          service.postLoginForm(formData)
            .then( (result) => { 
                console.log(result); 
                if (result == "LOGIN_SUCCESS") {
                    logIn();
                    history.push('/home'); 
                } else alert("Entered password is incorrect, try again.");
            })
            .catch(() => alert("Something go wrong, try again please"));
        };
    };

    const submitValidation = (fields) => {
        let valid = true;
        for (let [key, value] of Object.entries(fields)) {
          if (!value.value) {setIsvalid(key, false, "Enter something in this field"); valid=false};
        };
  
        return valid;
      };

    return (
        <form className="form" onSubmit={onSubmit}>
            <header className="formHeader">Fill the form to log in</header>
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

export default withService( withRouter( connect((state)=>({...state}), mapDispatchToProps)(LoginForm) ));
