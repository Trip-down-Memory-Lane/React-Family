import React, { Component } from 'react';
import './listUsers.css'
import { Link } from 'react-router';

export default class User extends Component{
    render(){
        return (
            <div className="team-box">
                <div>
                    <Link to={"/profile/" + this.props.userId}><span>{this.props.username}</span></Link>
                </div>
            </div>
        )
    }
}
