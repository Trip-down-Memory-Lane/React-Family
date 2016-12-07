import React, {Component} from 'react';
import $ from 'jquery';
import {Button} from 'reactstrap';
import {Router, Route, browserHistory} from 'react-router';

class Upgrade extends Component {
    constructor() {
        super();
        this.goTo = this.goTo.bind(this)
    }

    goTo() {
        sessionStorage.clear();
        browserHistory.push('/');
    }

    render() {
        let userId = sessionStorage.getItem('userId');
        $('body').css("background-image", "url('profile/loginHelper/img/backgrounds/back.jpg')")
        return (
            <div>

                <Button style={{"marginTop":"10%","color":"blue","fontFamily":"Comic Sans MS"}} outline color="danger" onClick={this.goTo}>GO TO TRIAL VERSION AND LOGIN IN AGAIN</Button>
                <h1 style={{"color":"green","paddingTop":"20%","fontFamily":"Comic Sans MS"}}>OR GRAB YOUR PROFESSIONAL SUPPORTED ACCOUNT WITH 10 % DISCOUNT</h1>
                <Button outline color="primary" >
                    <div style={{"color":"blue","marginTop":"20%"}}>CLICK HERE</div></Button>



            </div>
        )
    }
}

export default Upgrade