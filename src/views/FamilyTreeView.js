import React, {Component} from "react";
import {Header, Footer} from "../components/Template.js"
import FamilyTree from "../components/FamilyTree";

class FamilyTreeView extends Component {
    constructor(props) {
        super(props);
        this.currentUser = `TreeRoot`;
    }

    render() {
        return(
            <div id="wrapper">
                <Header/>
                <div id="content">
                    <FamilyTree user={this.currentUser} />
                </div>
                <Footer/>
            </div>
        );
    }
}

export default FamilyTreeView;
