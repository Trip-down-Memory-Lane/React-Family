import React, { Component } from 'react';
import User from './User';
import UserController from '../../controllers/UserController';

export default class CatalogPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            users: [],
        };

        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentWillMount(){
        UserController.loadUsers(this.onLoadSuccess);
    }

    onLoadSuccess(response){
        // console.log('RESPONSE :');
        // console.log(response);
        let searchId = response[0]._id;
        UserController.deleteSearchData(searchId,onDeleteSuccess);

        //console.log(response);

        function onDeleteSuccess(response) {
            // test
            //console.log('deleted');
        }

        let users = response[0].results;
        console.log(users);

        users = users.sort((a, b) => {
            if (a.firstName === b.firstName){
                return a.lastName.localeCompare(b.lastName);
            }

            return a.firstName.localeCompare(b.firstName);
        });

        let resultUsers = [];
        for (let user of users){
            let data = {
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id,
                profilePicture: user.profilePicture,
            };

            resultUsers.push(data);
        }

        this.setState({
            users: resultUsers,
        });
    }

    render(){
        // console.log('LIST USERS');
        // console.log(this.state.users);

        if (this.state.users.length > 0){
            return (
                <div>
                    <h1>Users</h1>

                    {this.state.users.map((u, i) => {
                        return (
                            <User
                                key={i}
                                firstName={u.firstName}
                                lastName={u.lastName}
                                userId={u.userId} />
                        );
                    })}
                </div>
            )
        }
        else{
            return <div>No such user found.</div>
        }


    }
}
