import React from 'react';
import ImageGallery from 'react-image-gallery';
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import $ from 'jquery';
import AddPhotoButton from '../components/AddPhotoButton'
import DeletePhotoButton from '../components/DeletePhotoButton'

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

        this.setState({
            deleteButton: <DeletePhotoButton></DeletePhotoButton>
        });

    }


    defineAddPhotoButtonVisibility() {
        if (this.props.userId) {
            let userId = sessionStorage.getItem('userId');

            if (this.props.userId !== userId) {
                return null;
            }
            else {

                return <div>
                    <AddPhotoButton  pictures={this.props.pictures} />
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



    render() {
        let AddPhotoBut = this.defineAddPhotoButtonVisibility();



        return (
            <div  >
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={this.props.pictures}
                    autoPlay={true}
                    onClick={this.showDeleteButton}
                    showFullscreenButton={true}
                    slideInterval={3500}
                    onImageLoad={this.handleImageLoad}/>
                <div className="container">
                    <div className="row" style={{"paddingRight": "75%"}}>
                        {AddPhotoBut}
                    </div>
                </div>
            </div>

        );
    }

}

export default Gallery
