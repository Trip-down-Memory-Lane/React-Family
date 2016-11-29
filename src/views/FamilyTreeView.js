import React, {Component} from "react";
import {Header, Footer} from "../components/Template.js"
import FamilyTree from "../components/FamilyTree";

class FamilyTreeView extends Component {
    render() {
        return(
            <div id="wrapper">
                <Header/>
                <div id="content">
                    <FamilyTree />
                </div>
                <Footer/>
            </div>
        );
    }
}

export default FamilyTreeView;
