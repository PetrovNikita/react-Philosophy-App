import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../actions";
import { withRouter } from "react-router-dom";

function RegForm ({logIn, loggedIn, history}) {
    console.log(loggedIn);

    const onSubmit = (event) => {
        event.preventDefault();
        logIn();
        history.push('/home');
    }

    return (
        <form
            onSubmit={onSubmit}>
            <input key='name' type="text" defaultValue="Name" />
            <input key='submit' type="submit" value="Enter" />
        </form>
    )
}


  
  const mapDispatchToProps = (dispatch) => {
  
    return {
      logIn: () => dispatch(logIn()),
    };
  };

  
  
  export default withRouter( connect((state)=>({...state}), mapDispatchToProps)(RegForm) );