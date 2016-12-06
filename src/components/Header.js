import React, {Component} from "react";
import NavigationBar from "./NavigationBar";

class Header extends Component {

    render() {
        return(
            <header>
                <NavigationBar page={this.props.page} />
            </header>
        );
    }
}


export default Header;
