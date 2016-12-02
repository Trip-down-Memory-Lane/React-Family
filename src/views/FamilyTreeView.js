import React, {Component} from "react";
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
            clicked: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.updateScrollPosition = this.updateScrollPosition.bind(this);
    }

    handleMouseDown(event) {
        this.setState({
            clickX: event.pageX,
            clicked: true
        });
    }

    handleMouseMove(event) {
        if (this.state.clicked) {
            this.updateScrollPosition(event);
        }

    }

    handleMouseUp() {
        this.setState(prevState => {
            return {
                clickX: prevState.clickX,
                clicked: false
            }
        })
    }

    updateScrollPosition(event) {
        console.log($(window).scrollLeft(), this.state.clickX, event.pageX);
        $(document).css(`cursor`, `row-resize`);
        $(window).scrollLeft($(window).scrollLeft() + (this.state.clickX - event.pageX))
    }

    render() {
        return(
            <div id="wrapper">
                <Header/>
                <div
                    onMouseMove={this.handleMouseMove}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    id="content">
                    <FamilyTree tree={this.props.tree} />
                </div>
                <Footer/>
            </div>
        );
    }
}

export default FamilyTreeView;
