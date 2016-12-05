import React from 'react';
import UserController from '../controllers/UserController';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router';

class NavigationBar extends React.Component {

    constructor(props){
        super(props);
        this.handleLogoutClicked = this.handleLogoutClicked.bind(this);

    }

    handleLogoutClicked(){
        UserController.logout();
    }

    render() {
        return (
            <div style={{"fontSize": "25px", "fontFamily": "Comic Sans MS"}}>
                <Navbar color="faded" light>
                    <Nav className="float-xs-right" navbar>
                        <NavItem style={{"fontSize": "25px"}}>
                            <Link to="/home/profile">View profile</Link>
                        </NavItem>
                        <NavItem style={{"fontSize": "25px"}}>
                            <Link to="/home/profile/edit">Edit profile</Link>
                        </NavItem>
                        <NavItem style={{"fontSize": "25px"}}>
                            <NavLink href="#" onClick={this.handleLogoutClicked}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default  NavigationBar