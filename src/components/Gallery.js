import React from 'react';
import ImageGallery from 'react-image-gallery';
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import $ from 'jquery';
import AddPhotoButton from '../components/AddPhotoButton'
import DeletePhotoButton from '../components/DeletePhotoButton'
import UserController from '../controllers/UserController'

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.defineAddPhotoButtonVisibility = this.defineAddPhotoButtonVisibility.bind(this)
        this.showDeleteButton = this.showDeleteButton.bind(this);
        this.state = ({
            deleteButton: null
        });
    }


    handleImageLoad(event) {
        $('.backstretch').remove();
        $('body').css('background', '#d0e5e2')
    }

    showDeleteButton() {

        //console.log('PICTURE CLICKED');
        this.setState({
            deleteButton: <DeletePhotoButton></DeletePhotoButton>
        });
        //console.log(this.state.deleteButton);

    }


    defineAddPhotoButtonVisibility() {
        if (this.props.userId) {
            let userId = sessionStorage.getItem('userId');

            if (this.props.userId !== userId) {
                return null;
            }
            else {

                return <div>
                    <AddPhotoButton  pictures={this.props.pictures}></AddPhotoButton>
                    <DeletePhotoButton updateInfo={this.props.updateInfo}  pictures={this.props.pictures}/>
                </div>
            }
        } else {

            return <div>
                <AddPhotoButton pictures={this.props.pictures}></AddPhotoButton>
                <DeletePhotoButton updateInfo={this.props.updateInfo}  pictures={this.props.pictures}/>
            </div>

        }

    }
    componentWillMount() {
        // console.log('USER ID');
        // console.log(this.props.userId);
        // UserController.loadUserInfo(this.props.params.userId, this.onLoadUserInfoSuccess);
        // UserController.loadUserPictures(this.props.params.userId, this.onLoadUserPicturesSuccess)
    }


    render() {
        let AddPhotoBut = this.defineAddPhotoButtonVisibility();



        return (
            <div  >
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={this.props.pictures}
                    autoPlay={true}
                    onClick={this.showDeleteButton}
                    showFullscreenButton={false}
                    slideInterval={3500}
                    onImageLoad={this.handleImageLoad}/>
                <div className="container">
                    <div className="row" style={{"paddingRight": "75%"}}>
                        {AddPhotoBut}

                    </div>
                    <div >
                        SOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXT
                    </div>

                </div>

            </div>

        );
    }

}

export default Gallery
