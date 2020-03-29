import React, { Component } from 'react';
import { Menu, Icon, Container } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

import { getCurrentUser, logout, getJwt } from '../services/authService';

class Navbar extends Component {
    state = {
        user: null
    };

    userlogout = () => {
        logout();
        this.setState({ user: getCurrentUser(getJwt()) });
        this.props.history.push('/login');
    };

    render() {
        const user = getCurrentUser(getJwt());
        return (
            <Container style={{ marginBottom: '80px' }}>
                <Menu borderless size="big" fixed="top" inverted>
                    <Menu.Item as={Link} header>
                        <Icon name="paste" />
                        <Link to="/">Note App</Link>
                    </Menu.Item>
                    {user ? (
                        <Menu.Item
                            onClick={this.userlogout}
                            position="right"
                            header
                        >
                            <Icon name="power" />
                            Logout
                        </Menu.Item>
                    ) : null}
                </Menu>
            </Container>
        );
    }
}

export default withRouter(Navbar);
