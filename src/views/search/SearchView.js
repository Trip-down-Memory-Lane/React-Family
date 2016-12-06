import React, {Component} from 'react';
import SearchForm from './SearchForm';

export default class SearchView extends Component{

    render(){
        return(
            <div className="container">
                <SearchForm
                    onChange={this.props.onChange}
                    onSubmit={this.onSubmit}
                    search={this.state.search}/>
            </div>
        )
    }
}