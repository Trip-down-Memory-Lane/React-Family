import React from 'react';
// import {Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import PhotoAlbum from  '../components/PhotoAlbum'
import Gallery from '../components/Gallery'
import Avatar from '../components/ProfileInfo'
import AboutMe from '../components/Aboutme'
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserController from '../controllers/UserController'


import CreateTreeButton from '../components/CreateTreeButton'
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap'
import '../styles/profileView.css';
import '../../public/loginHelper/img/backgrounds/Tree.png'

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
        ];

        this.state = {
            images: images,
            firstName: '',
            lastName: '',
            basicInfo: ''
        };
        this.updatePics = this.updatePics.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);

        // From Roli
        this.onLoadUserInfoSuccess = this.onLoadUserInfoSuccess.bind(this);
        this.onLoadPicturesSuccess = this.onLoadPicturesSuccess.bind(this);
    }

    updatePics(e) {
        console.log('UPDATE PICS');
    }

    componentWillMount(){
        let userId = sessionStorage.getItem('userId');

        UserController.loadUserInfo(userId, this.onLoadUserInfoSuccess);
        UserController.getUserPictures(userId, this.onLoadPicturesSuccess);
    }

    onLoadUserInfoSuccess(data){
        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            basicInfo: data.basicInfo
        });
    }

    onLoadPicturesSuccess(data){
        //console.log('on load pictures success');
        for (let pic of data){
            console.log(pic.imageUrl);
        }
    }

    // componentWillMount() {
    //
    //     UserController.loadUserInfo(sessionStorage.getItem('userId'), this.onLoadSuccess);
    //     let pictures = UserController.getUserPictures();
    //
    //     console.log(pictures);
    //     let userPictures = [];
    //     for (let i = 0; i < pictures.length; i++) {
    //         let pic = {};
    //         pic.original = pictures[i];
    //         pic.thumbnail = pictures[i];
    //         if (pictures[i].hasOwnProperty('description')) {
    //             pic.description = pictures[i].description;
    //         }
    //         userPictures.push(pic);
    //     }
    //     console.log(userPictures);
    //     // this.setState({images:userPictures})
    //
    // }
    //
    // onLoadSuccess(data) {
    //
    //     this.setState({
    //         firstName: data.firstName,
    //         lastName: data.lastName,
    //         basicInfo: data.basicInfo
    //     })
    // }

    render() {
        console.log('tuk');
        console.log(UserController.loadUserInfo(sessionStorage.getItem('userId'),function (data) {
            //console.log(data);
        }));
        return (
            <div>
                <Header/>
                <div className="row" id="profileContainer">
                    <div className="row">
                        <div id="profileBar">
                            <FormGroup>
                                <Label id="profileSearchLabel" for="exampleSearch">Find your family members</Label>
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

                                <div className="col-md-6" style={{
                                    "paddingTop": "10%",
                                    "paddingRight": "20%",
                                    "backgroundColor": "",
                                    "width": "50%"
                                }}>
                                    <img id="tree" src="http://www.freeiconspng.com/uploads/forest-icon-png-20.png"
                                         href="#" style={{"width": "100%", "height": "100%", "cursor": "pointer"}}/>
                                    <div style={{"margiTop": ""}}>
                                        VIEW FAMILY TREE
                                    </div>
                                </div>

                                <div className="col-md-6" style={{
                                    "paddingTop": "7%",
                                    "paddingBottom": "2%",
                                    "paddingRight": "10%",
                                    "backgroundColor": ""
                                }}>
                                    <Avatar />
                                    <AboutMe name={this.state.firstName +' '+ this.state.lastName}></AboutMe>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div></div>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,

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