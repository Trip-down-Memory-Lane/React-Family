import React, {Component} from 'react';
import SearchForm from './SearchForm';

export default class SearchView extends Component{

    constructor(props){
        super(props);

        this.state = {
            search: '',
        };

        // this.onChange = this.onChange.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
    }
    //
    // onChange(event){
    //     event.preventDefault();
    // }
    //
    // onSubmit(event){
    //     event.preventDefault();
    // }

    render(){
        console.log(this.onSubmitSearch);
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