import React, {Component} from "react";
import $ from "jquery";

import Header from '../components/Header'
import Footer from "../components/Footer.js"
import FamilyTree from "../components/treeComponents/FamilyTree";
import TreeController from "../controllers/TreeController";


export default class FamilyTreeView extends Component {
    /*
    * props:
    *   tree: <JSON> object, representing family tree
    * */
    constructor(props) {
        super(props);
        this.state = {
            clickX: null,
            clicked: false,
            info: `Loading..`
        };

        this.updateState = this.updateState.bind(this);

        // this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handleMouseMove = this.handleMouseMove.bind(this);
        // this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    updateState(response) {
        let tree = response.tree
        console.log(`updating state`, response);
        this.setState(prevState => {
            return {
                clickX: prevState.clickX,
                clicked: prevState.clicked,
                info: null,
                tree: tree
            }
        }, () => console.log(this.state));
    }

    // shouldComponentUpdate(nextState) {
    //     return !(this.state.tree === nextState.tree);
    // }

    isLoading() {
        console.log(`isloading?`);
        if (this.state.info) {
            console.log(`it is still loading.`);
            return (
                <div id="wrapper">{this.state.info}</div>
            );
        } else {
            console.log(`it is not loading`);
            return (
                <div id="wrapper">
                    <div
                        onMouseMove={this.handleMouseMove}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        id="content">
                        <FamilyTree treeRoot={this.state.tree} />
                    </div>
                    <Footer/>
                </div>
            );
        }
    }

    componentDidMount() {
        this.tree = TreeController.loadTree(`5845a8b4e6d6cc6310b0847d`)
            .then(this.updateState);
    }

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
        console.log(`rendering`);
        return (
            <div id="wrapper">
                <div
                    onMouseMove={this.handleMouseMove}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    id="content">
                    <FamilyTree treeRoot={this.state.tree} />
                </div>
                <Footer/>
            </div>
        );
    }
}

