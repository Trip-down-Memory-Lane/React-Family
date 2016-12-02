import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import PhotoAlbum from  '../components/PhotoAlbum'
import Gallery from '../views/gallery'
import Person from '../components/ProfileInfo'
import AboutMe from '../components/Aboutme'
import CreateTreeButton from '../components/CreateTreeButton'

class NavigationBar extends React.Component {
    render() {
        return (
            <div >
                <Navbar color="faded" light>
                    {/*<NavbarBrand href="/#/profile/edit">Edit</NavbarBrand>*/}
                    <Nav className="float-xs-right" navbar>
                        <NavItem style={{"fontSize": "25px"}}>
                            <NavLink href="/#">Logout</NavLink>
                        </NavItem>
                        <NavItem style={{"fontSize": "25px","width":"800px"}}>
                            <NavLink href="/tree"><CreateTreeButton/></NavLink>
                        </NavItem>
                        {/*<NavItem style={{"fontSize": "25px",}}>*/}
                        {/*<NavLink href="/register">LOGOUT</NavLink>*/}
                        {/*</NavItem>*/}

                    </Nav>
                </Navbar>
                <div className="row">
                    <div className="col-md-6">

                        <PhotoAlbum style={{"width": "200px!important"}}></PhotoAlbum></div>
                    <div className="row">
                        <div className="col-md-6"><Person/></div>
                        <div className="col-md-6"><AboutMe></AboutMe></div>

                    </div>
                </div>

            </div>
        );
    }
}

export default  NavigationBar