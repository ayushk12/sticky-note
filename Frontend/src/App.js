import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import 'moment-timezone';

import Navbar from './components/Navbar';
import Home from './components/Home';
import EditNote from './components/EditNote';
import NewNote from './components/NewNote';
import AuthForm from './components/AuthForm';
import NotFound from './components/NotFound';
import { getCurrentUser, getJwt, setTokenHeader } from './services/authService';
import './index.css';

class App extends Component {
    state = {
        user: null
    };

    setUser = () => {
        const user = getCurrentUser(getJwt());
        this.setState({ user });
    };

    componentDidMount() {
        this.setUser();
        const user = getCurrentUser(getJwt());
        if (user) {
            setTokenHeader(getJwt());
        } else {
            this.props.history.push('/login');
        }
    }
    render() {
        return (
            <Fragment>
                <Navbar user={getCurrentUser(getJwt())} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/editNote" component={EditNote} />
                    <Route path="/newNote" component={NewNote} />
                    <Route
                        path="/login"
                        render={props => (
                            <AuthForm
                                {...props}
                                header="Log-in to your account"
                                type="Login"
                                setUser={this.setUser}
                            />
                        )}
                    />
                    <Route
                        path="/register"
                        render={props => (
                            <AuthForm
                                {...props}
                                header="Register account"
                                type="Register"
                                setUser={this.setUser}
                            />
                        )}
                    />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Fragment>
        );
    }
}

export default withRouter(App);
