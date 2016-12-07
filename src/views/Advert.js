import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Button} from 'reactstrap'
import '../styles/profileView.css';
import '../../public/loginHelper/img/backgrounds/Tree.png'
import $ from 'jquery'
import '../../public/profile/loginHelper/img/backgrounds/Tree.png'
import {Link} from 'react-router';
import "../styles/circleButton.css"

class Advert extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {

        let userId = sessionStorage.getItem('userId');
        $('body').css("background-image","url('profile/loginHelper/img/backgrounds/back.jpg')")
        return (

            <div>

                <div className="row" id="profileContainer" style={{"width":"50%"}}  >
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