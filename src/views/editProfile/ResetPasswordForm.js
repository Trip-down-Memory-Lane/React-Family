import React, {Component} from 'react';

export default class ResetPasswordForm extends Component{
    render(){
        return(
            <form onSubmit={this.props.onPasswordSubmit}>
                <div>
                    <label>Enter old password</label>
                </div>
                <div>
                    <input type="password"
                           name="old-password"
                           onChange={this.props.onPasswordChange}
                           value={this.props.oldPassword}/>
                </div>
                <input type="submit" value="Reset password" className="btn btn-success"/>
            </form>
        )
    }
}