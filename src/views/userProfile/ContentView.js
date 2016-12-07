import React from 'react';
import Gallery from '../../components/Gallery'
import Avatar from '../../components/ProfileInfo'
import AboutMe from '../../components/Aboutme'
import UserController from '../../controllers/UserController'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {Link} from 'react-router';
import ViewTreeButton from '../../components/CreateTreeButton'
import '../../styles/profileView.css';
import '../../../public/loginHelper/img/backgrounds/Tree.png'
import $ from 'jquery'
import SearchForm from '../../views/search/SearchForm'

class GuestView extends React.Component {
    constructor(props) {
        super(props);
        $('.backstretch').remove();
        $('body').css('background', '#d0e5e2')

        this.updatePics = this.updatePics.bind(this);

        this.onLoadUserInfoSuccess = this.onLoadUserInfoSuccess.bind(this);
        this.onLoadPicturesSuccess = this.onLoadPicturesSuccess.bind(this);
    }

    updatePics(e) {
      let iid=(this.props.params.userId);
        UserController.loadUserInfo(iid, this.onLoadUserInfoSuccess);
        UserController.loadUserPictures(iid, this.onLoadPicturesSuccess);
    }

    onLoadUserInfoSuccess(data) {
        this.props.updateInfo(data);
    }

    onLoadPicturesSuccess(data) {
        let userPictures = [];

        for (let pic of data) {

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

    }




    render() {

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

                                <Gallery updateInfo={this.props.updateInfo} userId={this.props.userId} pictures={this.props.pictures} />
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
                                    <Avatar src={this.props.profilePicture}/>
                                    <AboutMe name={this.props.firstName + ' ' + this.props.lastName} basicInfo={this.props.basicInfo} />
                                </div>
                            </div>

                            <div className="col-md-6">
                            <h1></h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default GuestView