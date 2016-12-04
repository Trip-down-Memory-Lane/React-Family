import React, {Component} from "react";
import Header from '../components/Header'
import Footer from "../components/Footer.js"
import FamilyTree from "../components/FamilyTree";
import $ from "jquery";

class FamilyTreeView extends Component {
    /*
    * props:
    *   -tree: <JSON> object, representing family tree
    * */
    constructor(props) {
        super(props);
        this.state = {
            clickX: null,
            clicked: false,
        };
    }

    // handleSelectedPerson() {
    //     this.setState(prevState => {
    //         return {
    //             clickX: prevState.clickX,
    //             clicked: prevState.clicked,
    //         }
    //     })
    // }
    //
    // handleMouseDown(event) {
    //     let pageX = event.pageX;
    //     let pageY = event.pageY;
    //     this.setState(prevState => {
    //         return {
    //             clickX: pageX,
    //             clickY: pageY,
    //             clicked: true
    //         }
    //     });
    // }
    //
    // handleMouseMove(event) {
    //     if (this.state.clicked) {
    //         this.updateScrollPosition(event);
    //     }
    //
    // }
    //
    // handleMouseUp() {
    //     this.setState(prevState => {
    //         return {
    //             clickX: prevState.clickX,
    //             clicked: false
    //         }
    //     })
    // }
    //
    // updateScrollPosition(event) {
    //     $(document).css(`cursor`, `row-resize`);
    //     $(window).scrollLeft($(window).scrollLeft() + (this.state.clickX - event.pageX));
    //     $(window).scrollTop($(window).scrollTop() + (this.state.clickY - event.pageY));
    // }

    render() {
        return(
            <div id="wrapper">
                <div
                    onMouseMove={this.handleMouseMove}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    id="content">
                    <FamilyTree />
                </div>
                <Footer/>
            </div>
        );
    }
}

export default FamilyTreeView;
