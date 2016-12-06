import React, {Component} from 'react';
import UserProfile from './UserProfile';
import UserController from '../../controllers/UserController';
import GuestView from '../GuestView'
import {browserHistory} from 'react-router';

export default class CatalogPage extends Component {

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
        // console.log('UPDATE INFO');
        // console.log(data);
    }

    componentWillMount() {

        UserController.loadUserInfo(this.props.params.userId, this.onLoadUserInfoSuccess);
        UserController.loadUserPictures(this.props.params.userId, this.onLoadUserPicturesSuccess)
    }

    // componentDidMount(){
    //     UserController.loadUserInfo(this.props.params.userId, this.onLoadUserInfoSuccess);
    //     UserController.loadUserPictures(this.props.params.userId, this.onLoadUserPicturesSuccess)
    // }

    onLoadUserInfoSuccess(response) {
        this.setState({
            username: response.username,
            firstName: response.firstName,
            lastName: response.lastName,
            basicInfo: response.basicInfo,
            treeId: response.treeId,
        });
    }

    onLoadUserPicturesSuccess(data) {
        let userPictures = [];


        for (let pic of data) {
            // userPictures.push(pic.imageUrl);
            // console.log(pic);
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

    // onLoadUserPicturesSuccess(response) {
    //     let userPictures = [];
    //
    //     console.log('on load pictures success');
    //     for (let pic of response) {
    //
    //         let picture = {};
    //         let path=pic.imageUrl;
    //         if(!pic.imageUrl.startsWith('h')){
    //
    //             path='/'+path
    //         }
    //         picture.original =path;
    //         picture.thumbnail =path;
    //         if (pic.hasOwnProperty('description')) {
    //             picture.description = pic.description;
    //         }
    //         userPictures.push(picture);
    //     }
    //
    //     this.setState({images: userPictures})
    // }
    onChange(event){
        event.preventDefault();
        //console.log('GUEST VIEW CHANGING');
        this.setState({
            search: event.target.value,
        });
    }
    onSearchUserSuccess(response){
        //console.log(response);
        UserController.fillSearchResults(response, onFillSearchResultsSuccess);

        function onFillSearchResultsSuccess(response){
            browserHistory.push('/home/users');
        }
    }
    onSubmit(event){
        event.preventDefault();

        UserController.searchUser(this.state.search, this.onSearchUserSuccess);
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
                />
            </div>
        )
    }
}
