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

    componentDidMount(){
        UserController.loadUsers(this.onLoadSuccess);
    }

    onLoadSuccess(response){
        let searchId = response[0]._id;
        UserController.deleteSearchData(searchId,onDeleteSuccess);

        function onDeleteSuccess(response) {
            // test
            //console.log('deleted');
        }

        response = response.sort((a, b) => {
            if (a.results[0].firstName == b.results[0].firstName){
                return a.results[0].lastName.localeCompare(b.results[0].lastName);
            }
            return a.firstName.localeCompare(b.firstName);
        });

        for (let user of response){
            console.log(user.results[0].firstName);
        }

        let resultUsers = [];
        for (let user of response){
            let data = {
                firstName: user.results[0].firstName,
                lastName: user.results[0].lastName,
                //profilePicture: user.results[0].profilePicture,
            };

            resultUsers.push(data);
        }
        this.setState({
            users: resultUsers,
        });
    }

    render(){
        return (
            <div>
                <h1>Users</h1>

                {this.state.users.map((u, i) => {
                    return (
                        <User
                            key={i}
                            firstName={u.firstName}
                            lastName={u.lastName}
                            userId={u._id} />
                    );
                })}
            </div>
        )
    }
}
