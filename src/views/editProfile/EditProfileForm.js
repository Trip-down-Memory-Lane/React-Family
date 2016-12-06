import React, {Component} from 'react';
import { Link } from 'react-router';
import ResetPasswordForm from './ResetPasswordForm';

export default class EditProfileForm extends Component{


    render() {
        return (
            <div className="container">
                <h1>Edit your profile</h1>
                <form onSubmit={this.props.onSubmit}>

                    <img src={this.props.currentImageUrl}
                         style={{"width":"30%"}}
                    />

                    <div className="form-group">
                        <label>New profile picture url</label>
                        <input type="text"
                               className="form-control"
                               name="imgUrl"
                               placeholder="Image url"
                               value={this.props.imgUrl}
                               onChange={this.props.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email*</label>
                        <input type="text"
                               className="form-control"
                               name="email"
                               value={this.props.email}
                               onChange={this.props.onChange}
                               required
                        />
                    </div>

                    <div className="form-group">
                        <label>First name*</label>
                        <input type="text"
                               className="form-control"
                               name="firstName"
                               value={this.props.firstName}
                               onChange={this.props.onChange}
                               required
                        />
                    </div>

                    <div className="form-group">
                        <label>Last name*</label>
                        <input type="text"
                               className="form-control"
                               name="lastName"
                               value={this.props.lastName}
                               onChange={this.props.onChange}
                               required
                        />
                    </div>

                    <div className="form-group">
                        <label>Basic info</label>
                        <textarea type="text"
                               className="form-control"
                               name="basicInfo"
                               value={this.props.basicInfo}
                               onChange={this.props.onChange}
                        ></textarea>
                    </div>

                    <div>
                        <input type="submit"
                               value="Save changes"
                               className="btn btn-success"
                        />

                        <button className="btn btn-warning"><Link to={"/home/profile/" + sessionStorage.getItem('userId')}>Cancel</Link></button>
                    </div>
                </form>

                <div>
                    <input type="button" className="btn btn-primary" value="Reset password" onClick={this.props.onPasswordClicked}/>
                </div>

                <div>
                    {this.props.passwordReset ? <ResetPasswordForm
                        onPasswordSubmit={this.props.onPasswordSubmit}
                        onPasswordChange={this.props.onPasswordChange}
                        oldPassword={this.props.oldPassword}/> : null}
                </div>

            </div>
        )
    }

}

{/*<button className="btn btn-primary"><Link to="/home/password">Reset password</Link></button>*/}
