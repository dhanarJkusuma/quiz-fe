import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form
} from "reactstrap";

import Notification from './Notification';
import RegisterForm from './forms/RegisterForm';
import Loading from './Loading';

const Register = props => {

  const baseUrl = "http://localhost:8000";
  const signUpApi = "/api/user/register";

  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",

    isLoading: false,
    registerError: false,
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
  
  const OnRegister = e => {
    e.preventDefault();
    
    doRegister();
  };

  const doRegister = () => {
    setState(prevState => ({
      ...prevState,
      isLoading: true
    }));
    const api = baseUrl + signUpApi;
    const payload = {
      email: state.email,
      username: state.username,
      password: state.password,
      password_confirmation: state.password_confirmation
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
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        registerError: false,
        displayMessage: true,
        notificationMessage: data.message,
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
      }));
    })
    .catch(err => {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        registerError: true,
        displayMessage: true,
        notificationMessage: "Oops, something were wrong !!",
      }));
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
              <Form onSubmit={ OnRegister }>
                <CardTitle>
                  <h3 className="text-center">Sign Up</h3>
                </CardTitle>
                { state.displayMessage && <Notification correct={ !state.registerError } message={ state.notificationMessage } /> }              

                {
                  state.isLoading && <Loading color="danger" message="loading..."/>
                }
                
                {
                  !state.isLoading && <RegisterForm data={ state } onChangeField={ onChangeField }/>
                }

                <Button 
                  disabled={ state.isLoading }
                  type="submit" 
                  color="danger" 
                  size="lg"
                  outline 
                  block>
                  Sign Up Now!
                </Button>

                <Button onClick={() => props.history.push("/signin")} type="button" color="danger" size="lg" block>
                  Already have account? Sign In
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
