import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

 class NavigationBar extends React.Component {
    render() {
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
}

export default  NavigationBar