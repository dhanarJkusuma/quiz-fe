import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form
} from "reactstrap";

import Loading from './Loading';
import Notification from './Notification';
import SignInForm from './forms/SignInForm';
import Config from '../Config';

const Signin = props => {

  const signinApi = "/api/user/login";

  const [state, setState] = useState({
    email: "",
    password: "",


    isLoading: false,
    loginError: false,
    displayMessage: false,
    notificationMessage: "",
  });

  const onChangeField = e => {
    e.persist();
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const OnLogin = e => {
    e.preventDefault();
    
    doLogin();
  };

  const GoDashboard = () => {
    props.history.push("/");
  };

  const doLogin = () => {
    setState(prevState => ({
      ...prevState,
      isLoading: true
    }));
    const api = Config.server.BaseUrl + signinApi;
    const payload = {
      email: state.email,
      password: state.password
    };
    fetch(api, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(payload)
    })
    .then(response => {
        let respData = response.json();
        return respData;
    })
    .then(data => {
      if (typeof data.user !== 'undefined' && data.user != null) {
        const userToken = data.token;
        const userData = data.user;
        localStorage.setItem('session-id', userToken);
        localStorage.setItem('session-user-id', userData.id);

        setState(prevState => ({
          ...prevState,
          isLoading: false,
          loginError: false,
          displayMessage: true,
          notificationMessage: "Redirecting...",
        }));

        GoDashboard();
      }else{
        setState(prevState => ({
          ...prevState,
          isLoading: false,
          loginError: true,
          displayMessage: true,
          notificationMessage: data.message,
        }));
      }
    })
    .catch(err => {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        loginError: true,
        displayMessage: true,
        notificationMessage: "Failed to connect game server",
      }))
    });
  }


  useEffect(() => {
    const token = localStorage.getItem('session-id');
    const uid = localStorage.getItem('session-user-id');
    
    if (token !== null || uid !== null){
      props.history.push("/");
    }
  }, [props.history]);

  return (
    <div className="container mt-5">
      <div className="col">
        <div style={{ width: "600px", margin: "auto" }}>
          <Card>
            <CardBody>
              <Form onSubmit={e => OnLogin(e)}>
                <CardTitle>
                  <h3 className="text-center">Login Page</h3>
                </CardTitle>
                { state.displayMessage && <Notification correct={ !state.loginError } message={ state.notificationMessage } /> }              

                {
                  state.isLoading && <Loading color="primary" message="loading..."/>
                }
                
                {
                  !state.isLoading && <SignInForm data={ state } onChangeField={ onChangeField }/>
                }

                <br />
                <br />
                <Button 
                  disabled={ state.isLoading }
                  type="submit" 
                  color="danger" 
                  outline 
                  block>
                  Sign In
                </Button>

                <Button
                  disabled={ state.isLoading }
                  onClick={() => props.history.push("/signup")}
                  type="button"
                  color="danger"
                  block
                >
                  Sign Up
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signin;
