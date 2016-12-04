import React, {Component} from 'react';

export default class EditProfileForm extends Component{

    render() {
        return (
            <div className="container">
                <h1>Edit your profile</h1>
                <form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text"
                               className="form-control"
                               name="firstName"
                               value={this.props.firstName}
                               onChange={this.props.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text"
                               className="form-control"
                               name="lastName"
                               value={this.props.lastName}
                               onChange={this.props.onChange}
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
                               className="btn btn-default"
                        />
                    </div>
                </form>
            </div>
        )
    }

}

