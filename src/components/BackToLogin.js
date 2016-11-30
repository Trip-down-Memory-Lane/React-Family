import React, {Component} from "react";
import changeView from '../controllers/ViewManager'
import { Button } from 'reactstrap';
import Path from '../constants/constant'
import {Router, Route, hashHistory, Link} from 'react-router';

class BackToLogin extends Component{

    render(){
        return(
            <Link to="/">
            <Button id="toLogin"
                 className="btn"><div  >Back to Login !</div></Button>
            </Link>
        )
    }
}

export  default BackToLogin
