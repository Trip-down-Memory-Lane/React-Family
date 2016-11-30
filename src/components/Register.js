import React, {Component} from "react";
import changeView from '../controllers/ViewManager'
import { Button } from 'reactstrap';
import Path from '../constants/constant'

class Register extends Component{

    render(){
        return(
            <Button id="register"  color="primary"
                 className="btn" onClick={() => changeView(Path.registerView())}><a >Register Com !</a ></Button>
        )
    }
}

export  default Register
