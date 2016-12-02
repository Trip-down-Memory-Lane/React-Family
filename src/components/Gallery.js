/*
import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
 import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import $ from 'jquery';
import AddPhotoButton from '../components/AddPhotoButton'

class Gallery extends React.Component {
    constructor(){
        super();
        const images = [
            {
                original:  'loginHelper/img/backgrounds/11.jpg',
                thumbnail:  'loginHelper/img/backgrounds/11.jpg',
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
                original:'loginHelper/img/backgrounds/image2.jpg',
                description: 'My Sweet Family 3...',

                thumbnail: 'loginHelper/img/backgrounds/image2.jpg',
            }
        ]
        this.state={
            images: images
        }

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
                    items={this.state.images}
                    autoPlay={true}

                    showFullscreenButton={false}
                    slideInterval={3500}
                    onImageLoad={this.handleImageLoad}/>
                <div className="container">
                    <div className="row" style={{"paddingRight":"75%"}}>
                        <AddPhotoButton/>
                    </div>
                    <div >
                        SOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXT
                    </div>

                </div>

            </div>

        );
    }

}

export default Gallery*/
