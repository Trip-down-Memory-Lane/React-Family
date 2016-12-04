import React, { Component } from 'react';
import './UserProfile.css'

export default class UserProfile extends Component{
    render(){
        return (
            <div className="user-box">
                <div>
                    <span className="spanner">Username</span>
                    <span>{this.props.username}</span>
                </div>

                <div>
                    <span className="spanner">First Name</span>
                    <span>{this.props.firstName}</span>
                </div>

                <div>
                    <span className="spanner">Last Name</span>
                    <span>{this.props.lastName}</span>
                </div>

                <div>
                    <span className="spanner">Basic info</span>
                    <span>{this.props.basicInfo}</span>
                </div>
            </div>
        )
    }
}
