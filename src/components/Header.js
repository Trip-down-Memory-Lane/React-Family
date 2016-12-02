import React, {Component} from "react";
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import NavigBar from "./NavigationBar";

class Header extends Component {
    render() {
        return(
            <header>
                <NavigBar />
            </header>
        );
    }
}

export default Header;
