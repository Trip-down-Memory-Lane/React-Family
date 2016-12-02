import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class NavBar extends React.Component {
    render() {
        return (
                <Navbar color="faded" light>
                    {/*<NavbarBrand href="/#/profile/edit">Edit</NavbarBrand>*/}
                    <Nav className="float-xs-right" navbar>
                        <NavItem style={{"fontSize": "25px"}}>
                            <NavLink href="/" >Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
        );
    }
}

export default  NavBar