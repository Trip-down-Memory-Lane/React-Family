import React from 'react';
import PhotoAlbum from  '../components/PhotoAlbum'
import Gallery from '../components/Gallery'
import Avatar from '../components/ProfileInfo'
import AboutMe from '../components/Aboutme'
import UserController from '../controllers/UserController'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import ViewTreeButton from '../components/CreateTreeButton'
import { FormGroup, Label, Input} from 'reactstrap'
import '../styles/profileView.css';
import '../../public/loginHelper/img/backgrounds/Tree.png'
import $ from 'jquery'
import SearchForm from '../views/search/SearchForm'

class GuestView extends React.Component {
    constructor(props) {
        super(props);
        $('.backstretch').remove();
        $('body').css('background', '#d0e5e2')

        // const images = [
        //     {
        //         original: 'loginHelper/img/backgrounds/11.jpg',
        //         thumbnail: 'loginHelper/img/backgrounds/11.jpg',
        //         originalclassName: 'featured-slide',
        //         thumbnailclassName: 'featured-thumb',
        //         originalAlt: 'original-alt',
        //         thumbnailAlt: 'thumbnail-alt',
        //         thumbnailLabel: 'Optional',
        //         description: 'My Sweet Family...',
        //         srcSet: 'Optional srcSet (responsive images src)',
        //         sizes: ''
        //     },
        //     {
        //         original: 'loginHelper/img/backgrounds/22.jpg',
        //         description: 'My Sweet Family 2...',
        //
        //         thumbnail: 'loginHelper/img/backgrounds/22.jpg',
        //     },
        //     {
        //         original: 'loginHelper/img/backgrounds/image2.jpg',
        //         description: 'My Sweet Family 3...',
        //
        //         thumbnail: 'loginHelper/img/backgrounds/image2.jpg',
        //     }
        // ];

        // this.state = {
        //
        //     firstName: '',
        //     lastName: '',
        //     basicInfo: '',
        //     search:''
        // };
        this.updatePics = this.updatePics.bind(this);
        //this.onLoadSuccess = this.onLoadSuccess.bind(this);

        // From Roli
        this.onLoadUserInfoSuccess = this.onLoadUserInfoSuccess.bind(this);
        this.onLoadPicturesSuccess = this.onLoadPicturesSuccess.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.onChange = this.onChange.bind(this);
    }

    updatePics(e) {
        //console.log('UPDATE PICS');
      let iid=(this.props.params.userId);
        let userId = this.props.userId;
        //console.log(iid);
        //
            UserController.loadUserInfo(iid, this.onLoadUserInfoSuccess);
             UserController.loadUserPictures(iid, this.onLoadPicturesSuccess);
    }

    componentWillReceiveProps() {
        let userId = this.props.userId;

        UserController.loadUserInfo(userId, this.onLoadUserInfoSuccess);
        UserController.loadUserPictures(userId, this.onLoadPicturesSuccess);
    }

    onLoadUserInfoSuccess(data) {

        this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            basicInfo: data.basicInfo
        });

        // console.log('úser info');
        // console.log(data);
        this.props.updateInfo(data);
        // this.setState({
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     basicInfo: data.basicInfo
        // });
    }

    onLoadPicturesSuccess(data) {
        let userPictures = [];

        // console.log('pictures');
        // console.log(data);
        for (let pic of data) {
            // userPictures.push(pic.imageUrl);
            // console.log(pic);
            let picture = {};
            picture.original = pic.imageUrl;
            picture.thumbnail =pic.imageUrl;
            picture.id=pic._id;
            if (pic.hasOwnProperty('description')) {
                picture.description = pic.description;
            }
            userPictures.push(picture);
        }
        this.props.updateInfo(data);
        //
        // this.setState({images:userPictures})
    }
    onChange(event){
        let userId = this.props.userId;

        UserController.loadUserInfo(userId, this.onLoadUserInfoSuccess);
        UserController.loadUserPictures(userId, this.onLoadPicturesSuccess);
    }
    // onSearchUserSuccess(response){
    //     console.log(response);
    //     UserController.fillSearchResults(response, onFillSearchResultsSuccess);
    //
    //     function onFillSearchResultsSuccess(response){
    //         browserHistory.push('/home/users');
    //     }
    // }
    // onSubmit(event){
    //     event.preventDefault();
    //
    //     UserController.searchUser(this.state.search, this.onSearchUserSuccess);
    // }


// shouldComponentUpdate(){
//         //this.updatePics()
//     let userId = this.props.userId;
//     //
//     //      UserController.loadUserInfo(userId, this.props.onLoadUserInfoSuccess);
//     //      UserController.loadUserPictures(userId, this.props.onLoadPicturesSuccess);
// }

    render() {
        // console.log('PARAMS');
        // console.log(this.props);

        return (
            <div>
                <div className="row" id="profileContainer">
                    <div className="row">
                        <div id="profileBar">
                            <SearchForm value={this.props.search} onSubmit={this.props.onSubmit} onChange={this.props.onChange}/>
                        </div>
                        <div style={{"paddingLeft": "20%", "paddingRight": "20%"}}>
                            <Link to={"/home/profile/" + this.props.userId + '/' + this.props.treeId }>
                                <ViewTreeButton/>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">

                            <div style={{"padding": "6%"}}>

                                <Gallery userId={this.props.userId} pictures={this.props.pictures}></Gallery>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">

                                <div className="col-md-6" style={{
                                    "paddingTop": "7%",
                                    "paddingBottom": "2%",
                                    "paddingRight": "10%",
                                    "backgroundColor": ""
                                }}>
                                    <Avatar />
                                    <AboutMe name={this.props.firstName + ' ' + this.props.lastName}></AboutMe>
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

            </div>
        )
    }
}

export default GuestView