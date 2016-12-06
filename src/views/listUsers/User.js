import React, { Component } from 'react';
import './listUsers.css'
import { Link } from 'react-router';

export default class User extends Component{
    render(){

        return (
            <div id="list-users-box">
                <div>

                    <Link to={"/home/profile/" + this.props.userId}><span className="spanner">{`${this.props.firstName} ${this.props.lastName}`}</span></Link>
                </div>
            </div>
        )
    }
}

{/*<img src={this.props.profilePicture} alt="profile picture"/>*/}
