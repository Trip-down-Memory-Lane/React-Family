import React from 'react';
import PhotoAlbum from  '../components/PhotoAlbum'
import Gallery from '../components/Gallery'
import Avatar from '../components/ProfileInfo'
import AboutMe from '../components/Aboutme'
import UserController from '../controllers/UserController'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {browserHistory} from 'react-router';
import CreateTreeButton from '../components/CreateTreeButton'
import { FormGroup, Label, Input,Button} from 'reactstrap'
import '../styles/profileView.css';
import '../../public/loginHelper/img/backgrounds/Tree.png'
import $ from 'jquery'
import SearchForm from '../views/search/SearchForm'
import '../../public/profile/loginHelper/img/backgrounds/Tree.png'
import {Link} from 'react-router';
import "../styles/circleButton.css"

class Advert extends React.Component {
    constructor(props) {
        super(props);
        //
        // var varCounter = 0;
        // var varName = function(){
        //     if(varCounter <= 100) {
        //         console.log('IIN');
        //         varCounter++;
        //         $('.backstretch').remove();
        //         $('body').css('background', '#d0e5e2')
        //         /* your code goes here */
        //     } else {
        //         clearInterval(varName);
        //     }
        // };

    }



    render() {

        let userId = sessionStorage.getItem('userId');
        $('body').css("background-image","url('profile/loginHelper/img/backgrounds/back.jpg')")
        return (

            <div>

                <div className="row" id="profileContainer" style={{"width":"50%"}}  >
                   {/*<img style={{"width":"100%","height":"100%","marginLeft":"10%"}}  src="/profile/loginHelper/img/backgrounds/Tree2.jpeg"></img>*/}
                    <Link to={"/home/profile/"+userId }>

                        <a>
                            <Button style={{"marginTop":"30%","marginLeft":"80%"}} color="primary" size="lg" >

                     GO TO YOUR PROFILE</Button></a>
                    </Link>


                </div>

            </div>
        )
    }
}

export default Advert