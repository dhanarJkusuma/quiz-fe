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
import IconEmail from "../components/icons/IconEmail";
import IconLock from "../components/icons/IconLock";
import IconText from "../components/icons/IconText";

const Register = (props) => {
  return (
    <div className="container mt-5">
      <div className="col">
        <div style={{ width: "600px", margin: "auto" }}>
          <Card>
            <CardBody>
              <Form>
                <CardTitle>
                  <h3 className="text-center">Sign Up</h3>
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
                        <IconText color="black" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Username"
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

                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <IconLock color="black" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password_confirmation"
                      id="password_confirmation"
                      placeholder="Password Confirmation"
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <Button type="submit" outline color="danger" size="lg" block>
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
