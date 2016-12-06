import React, {Component} from "react";
import NavigationBar from "./NavigationBar";

class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <header>
                <NavigationBar page={this.props.page} />
            </header>
        );
    }
}


export default Header;
