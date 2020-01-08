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

const SignInForm = ({ data, onChangeField }) => {
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
        </div>
    );
}

export default SignInForm;