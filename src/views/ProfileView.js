import React from 'react';
// import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
 import PhotoAlbum from  '../components/PhotoAlbum'
import Gallery from '../components/Gallery'
import Person from '../components/ProfileInfo'
import AboutMe from '../components/Aboutme'
import Header from '../components/Header';
import Footer from '../components/Footer';


import CreateTreeButton from '../components/CreateTreeButton'
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import '../styles/profileView.css';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        const images = [
            {
                original: 'loginHelper/img/backgrounds/11.jpg',
                thumbnail: 'loginHelper/img/backgrounds/11.jpg',
                originalclassName: 'featured-slide',
                thumbnailclassName: 'featured-thumb',
                originalAlt: 'original-alt',
                thumbnailAlt: 'thumbnail-alt',
                thumbnailLabel: 'Optional',
                description: 'My Sweet Family...',
                srcSet: 'Optional srcSet (responsive images src)',
                sizes: ''
            },
            {
                original: 'loginHelper/img/backgrounds/22.jpg',
                description: 'My Sweet Family 2...',

                thumbnail: 'loginHelper/img/backgrounds/22.jpg',
            },
            {
                original: 'loginHelper/img/backgrounds/image2.jpg',
                description: 'My Sweet Family 3...',

                thumbnail: 'loginHelper/img/backgrounds/image2.jpg',
            }
        ]
        this.state = {
            images: images
        }
        this.updatePics = this.updatePics.bind(this);
    }

    updatePics(e) {
        console.log('UPDATE PICS');
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="row" id="profileContainer">
                    <div className="row">
                        <div id="profileBar">
                            <FormGroup>
                                <Label id="profileSearchLabel"   for="exampleSearch">Find your family members</Label>
                                <Input type="search" name="search" id="exampleSearch"
                                       placeholder="     search placeholder"/>
                            </FormGroup>
                        </div>

                        <div style={{"paddingLeft": "20%", "paddingRight": "20%"}}>
                            <   CreateTreeButton/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">

                            <div style={{"padding": "6%"}}>

                                <Gallery images={this.state.images}></Gallery>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div style={{"paddingTop": "6%", "paddingBottom": "2%", "paddingLeft": "30%"}}>
                                    <Person/>
                                    <AboutMe></AboutMe>
                                </div>
                            </div>

                            <div className="col-md-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                                aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt mollit anim id est laborum.
                            </div>
                        </div>
                    </div>
                </div>

                {/*<Footer/>*/}

            </div>
        )
    }
}

export default ProfileView