import React, { Component } from 'react';
import User from './User';
import UserController from '../../controllers/UserController';

export default class CatalogPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            users: []};

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount(){
        UserController.loadUsers(this.onLoadSuccess);
    }

    onLoadSuccess(response){
        this.setState({users: response});
    }

    render(){
        return (
            <div>
                <h1>Users</h1>

                {this.state.users.map((u, i) => {
                    return (
                        <User
                            key={i}
                            username={u.username}
                            userId={u._id} />
                    );
                })}
            </div>
        )
    }
}
