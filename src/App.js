import React, {Component} from "react";
import Header from './components/Header'
import Footer from "./components/Footer.js"

class MainPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Header />
                {this.props.children}
                <Footer/>
            </div>
        )


    }
}

export default MainPage