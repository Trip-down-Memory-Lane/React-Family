
import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
 import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import $ from 'jquery';
import AddPhotoButton from '../components/AddPhotoButton'


class Gallery extends React.Component {
    constructor(props){
        super(props);


    }

    handleImageLoad(event) {
        $('.backstretch').remove();
        $('body').css('background', '#d0e5e2')

        console.log('Image loaded ', event.target)
    }

    render() {

        return (
            <div  >
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={this.props.images}
                    autoPlay={true}

                    showFullscreenButton={false}
                    slideInterval={3500}
                    onImageLoad={this.handleImageLoad}/>
                <div className="container">
                    <div className="row" style={{"paddingRight":"75%"}}>
                        <AddPhotoButton pictures={this.props.images}/>
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
