/*
import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
 import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import $ from 'jquery';

class Gallery extends React.Component {
    constructor(){
        super();
        $('.backstretch').remove();

    }

    handleImageLoad(event) {
        $('.backstretch').remove();
        $('body').css('background', '#d0e5e2')

        console.log('Image loaded ', event.target)
    }

    render() {
        const images = [
            {
                original: 'http://lorempixel.com/1000/600/nature/1/',
                thumbnail: 'http://lorempixel.com/250/150/nature/1/',
                originalclassName: 'featured-slide',
                thumbnailclassName: 'featured-thumb',
                originalAlt: 'original-alt',
                thumbnailAlt: 'thumbnail-alt',
                thumbnailLabel: 'Optional',
                description: 'My Sweet Family...',
                srcSet: 'Optional srcSet (responsive images src)',
                sizes: '400px'
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/2/',
                description: 'My Sweet Family 2...',

                thumbnail: 'http://lorempixel.com/250/150/nature/2/'
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/3/',
                description: 'My Sweet Family 3...',

                thumbnail: 'http://lorempixel.com/250/150/nature/3/'
            }
        ]

        return (
            <div  >
                <ImageGallery
                    ref={i => this._imageGallery = i}
                    items={images}
                    autoPlay={true}

                    showFullscreenButton={false}
                    slideInterval={3500}
                    onImageLoad={this.handleImageLoad}/>
                <div className="container">

                    <div >
                        SOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXTSOME TEXT
                    </div>

                </div>

            </div>

        );
    }

}

export default Gallery*/
