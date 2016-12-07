import React, {Component} from 'react';
import UserController from '../../controllers/UserController';
import GuestView from '../GuestView'
import {browserHistory} from 'react-router';

export default class userProfileView extends Component {

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
            username: '',
            firstName: '',
            lastName: '',
            basicInfo: '',
            profilePicture: '',
            pictures: images,
            search:'',
            treeId: '',
        };

        this.onLoadUserInfoSuccess = this.onLoadUserInfoSuccess.bind(this);
        this.onLoadUserPicturesSuccess = this.onLoadUserPicturesSuccess.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateInfo=this.updateInfo.bind(this);
    }
    updateInfo(data){

        let updatedPictures=[];
        for(let pic of data){
            for(let old of this.state.pictures){
                if(old.id!=pic){
                    updatedPictures.push(old)
                }
            }
        }

        this.setState({
           pictures:updatedPictures
       })
    }

    componentWillMount() {
        UserController.loadUserInfo(this.props.params.userId, this.onLoadUserInfoSuccess);
        UserController.loadUserPictures(this.props.params.userId, this.onLoadUserPicturesSuccess)
    }



    onLoadUserInfoSuccess(response) {
        this.setState({
            username: response.username,
            firstName: response.firstName,
            lastName: response.lastName,
            basicInfo: response.basicInfo,
            profilePicture: response.profilePicture,
            treeId: response.treeId,
        });
    }

    onLoadUserPicturesSuccess(data) {
        let userPictures = [];


        for (let pic of data) {

            let picture = {};
            picture.original = pic.imageUrl;
            picture.thumbnail =pic.imageUrl;
            picture.id = pic._id;
            if (pic.hasOwnProperty('description')) {
                picture.description = pic.description;
            }
            userPictures.push(picture);
        }

        this.setState({pictures:userPictures})
    }

    onChange(event){
        event.preventDefault();
        this.setState({
            search: event.target.value,
        });
    }

    onSubmit(event){
        event.preventDefault();
        UserController.searchUser(this.state.search, this.onSearchUserSuccess);
    }

    onSearchUserSuccess(response){
        UserController.fillSearchResults(response, onFillSearchResultsSuccess);

        function onFillSearchResultsSuccess(response){
            browserHistory.push('/home/users');
        }
    }

    render() {
        let userId={};
        if (this.props.params) {
             userId = this.props.params.userId
        }

        return (

            <div>
                <h1>User profile</h1>
                <GuestView
                    updateInfo={this.updateInfo}
                    onLoadUserInfoSuccess={this.onLoadUserInfoSuccess}
                    onLoadPicturesSuccess={this.onLoadPicturesSuccess}
                    onSubmit={this.onSubmit}
                    onChange={this.onChange}
                    search={this.state.search}
                    userId={userId}
                    treeId={this.state.treeId}
                    pictures={this.state.pictures}
                    username={this.state.username}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    basicInfo={this.state.basicInfo}
                    profilePicture={this.state.profilePicture}
                />
            </div>
        )
    }
}
