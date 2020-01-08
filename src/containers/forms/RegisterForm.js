import React from 'react';
import {
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
} from 'reactstrap';

import IconEmail from "../../components/icons/IconEmail";
import IconLock from "../../components/icons/IconLock";
import IconText from "../../components/icons/IconText";

const RegisterForm = ({ data, onChangeField }) => {
    return (
        <div>
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
                    value={ data.email }
                    onChange={ onChangeField }
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
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={ data.username }
                    onChange={ onChangeField }
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
                    value={ data.password }
                    onChange={ onChangeField }
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
                    value={ data.password_confirmation }
                    onChange={ onChangeField }
                    required
                    />
                </InputGroup>
            </FormGroup>
        </div>
    );
}

export default RegisterForm;