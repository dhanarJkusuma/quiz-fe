import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import { Link } from "react-router-dom";
import IconEmail from "../components/icons/IconEmail";
import IconLock from "../components/icons/IconLock";

const Signin = props => {
  const OnLogin = e => {
    e.preventDefault();
    GoDashboard();
  };
  const GoDashboard = () => {
    props.history.push("/");
  };
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

                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <IconEmail color="black" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <IconLock color="black" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <Button type="submit" outline color="danger" size="lg" block>
                  Sign In
                </Button>

                <Button
                  onClick={() => props.history.push("/signup")}
                  type="button"
                  color="danger"
                  size="lg"
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
