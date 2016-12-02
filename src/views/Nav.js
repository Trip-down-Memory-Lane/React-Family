import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import PhotoAlbum from  '../components/PhotoAlbum'
import Gallery from '../components/Gallery'
import Person from '../components/ProfileInfo'
import AboutMe from '../components/Aboutme'
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateTreeButton from '../components/CreateTreeButton'
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="row" style={{"fontSize": "25px", "fontFamily": "Comic Sans MS"}}>

                <Header />

                <div className="row">
                    <div style={{"paddingLeft": "30%", "paddingRight": "30%"}}>
                        <FormGroup>
                            <Label style={{"fontSize": "25px", "color": "#0d77a8", "font-family": "Comic Sans MS"}}
                                   for="exampleSearch">Find your family members</Label>
                            <Input type="search" name="search" id="exampleSearch"
                                   placeholder="     search placeholder"/>
                        </FormGroup></div>
                    <div style={{"paddingLeft": "20%", "paddingRight": "20%"}}>
                        <   CreateTreeButton/>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-6" >
                        <div style={{"padding":"6%"}}>
                            <Gallery ></Gallery>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div style={{"paddingTop":"6%","paddingBottom":"2%","paddingLeft":"30%"}}>
                                <Person/>
                                <AboutMe></AboutMe>
                            </div>
                        </div>
                        <div className="col-md-6">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </div>

                    </div>
                </div>

                <Footer/>

            </div>
        );
    }
}

export default  NavigationBar