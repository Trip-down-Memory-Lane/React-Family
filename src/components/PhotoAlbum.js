import React from 'react';
 import Gallery from 'react-photo-gallery';

import $ from 'jquery';

export default class PhotoAlbum extends React.Component {
    constructor(){
        super();
        $('.backstretch').remove();
        $('body').css('background', '#d0e5e2')
    }

    render() {


        return (

            <Gallery photos={PHOTO_SET} />
        );
    }
}

const PHOTO_SET = [
    {

        src: 'loginHelper/img/backgrounds/family.jpg',
        width: 681,
        height: 1024,
        aspectRatio: 1.5,
        lightboxImage:{
            src: 'loginHelper/img/backgrounds/11.jpg',
            srcset: [
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg'

            ]
        }
    },
    {
        src: 'loginHelper/img/backgrounds/22.jpg',
        width: 600,
        height: 600,
        aspectRatio: 1,
        lightboxImage:{
            src: 'loginHelper/img/backgrounds/22.jpg',
            srcset: [
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg'
            ]
        }
    },
    {
        src: 'loginHelper/img/backgrounds/2.jpg',
        width: 600,
        height: 600,
        aspectRatio: 1,
        lightboxImage:{
            src: 'loginHelper/img/backgrounds/22.jpg',
            srcset: [
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg'
            ]
        }
    },
    {
        src: 'loginHelper/img/backgrounds/image2.jpg',
        width: 600,
        height: 600,
        aspectRatio: 1,
        lightboxImage:{
            src: 'loginHelper/img/backgrounds/22.jpg',
            srcset: [
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg',
                'loginHelper/img/backgrounds/11.jpg'
            ]
        }
    }
];