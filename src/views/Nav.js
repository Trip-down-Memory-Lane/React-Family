import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Authenticator from '../utils/authentication';
import Navigator from '../utils/navigation';
import Path from '../constants/constant';
import LoginView from './LoginView';

 class NavigationBar extends React.Component {
    render() {
        if (Authenticator.isAuthenticated()){
            return (
                <div>
                    <Navbar color="faded" light>
                        <NavbarBrand href="/#/profile/edit">Edit</NavbarBrand>
                        <Nav className="float-xs-right" navbar>
                            <NavItem>
                                <NavLink href="/">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register">Logout</NavLink>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
            );
        }
        else{
            Navigator.navigate(Path.loginView());
            return <LoginView/>;
        }
    }
}

export default  NavigationBar