import React, {Component} from "react";
import { Button } from 'reactstrap';
import {Link} from 'react-router';

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
