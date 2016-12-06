import React, {Component} from 'react';
import '../../styles/profileView.css';

export default class SearchForm extends Component{

    render(){
        //console.log(this.props.onSubmit);
        return(
            <form onSubmit={this.props.onSubmit}>
                <div>
                    <label id="profileSearchLabel">Find your family members</label>
                </div>
                <div>
                    <input id="exampleSearch"
                           type="text"
                           name="search"
                           placeholder="Search..."
                           value={this.props.search}
                           onChange={this.props.onChange}/>
                    <input type="submit" className="btn btn-success"/>
                </div>
            </form>
        )
    }
}