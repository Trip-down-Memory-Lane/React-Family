import React, { Component } from 'react';
import UserProfile from './UserProfile';
import UserController from '../../controllers/UserController';

export default class CatalogPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            basicInfo: '',
        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount(){
        UserController.loadUserInfo(this.props.params.userId, this.onLoadSuccess);
    }

    onLoadSuccess(response){
        this.setState({
            username: response.username,
            firstName: response.firstName,
            lastName: response.lastName,
            basicInfo: response.basicInfo,
        });
    }

    render(){
        return (
            <div>
                <h1>Catalog page</h1>

                <UserProfile
                    username={this.state.username}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    basicInfo={this.state.basicInfo}
                />
            </div>
        )
    }
}
