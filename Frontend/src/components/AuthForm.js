import React, { Component } from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import authService from '../services/authService';
import { register } from '../services/userService';

class AuthForm extends Component {
    state = {
        email: '',
        password: ''
    };

    componentDidMount() {
        const user = authService.getCurrentUser(authService.getJwt());
        if (user) {
            this.props.history.push('/');
        }
    }

    renderLink = () => {
        if (this.props.type === 'Login') {
            return (
                <Message>
                    New to us? <Link to="/register">Register</Link>
                </Message>
            );
        } else
            return (
                <Message>
                    Already a member? <Link to="/login">Login</Link>
                </Message>
            );
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const authType = this.props.type;
        const { email, password } = this.state;
        let res;
        if (authType === 'Login') {
            res = await authService.login(email, password);
            authService.setTokenHeader(authService.getJwt());
        } else {
            res = await register(email, password);
            authService.setTokenHeader(authService.getJwt());
        }

        console.log(res);

        this.props.setUser();
        this.props.history.push('/');
    };

    render() {
        const { header, type } = this.props;
        return (
            <Grid
                textAlign="center"
                style={{ height: '100vh' }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        {header}
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input
                                fluid
                                icon="user"
                                type="email"
                                iconPosition="left"
                                name="email"
                                placeholder="E-mail address"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />

                            <Button color="teal" fluid size="large">
                                {type}
                            </Button>
                        </Segment>
                    </Form>
                    {this.renderLink()}
                </Grid.Column>
            </Grid>
        );
    }
}

export default AuthForm;
