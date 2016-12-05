import React, {Component} from "react";
import SiblingsChildrenForm from "./SiblingsChildrenForm";
import {Button, FormGroup} from "reactstrap";
import Consts from "../../constants/constant";

export default class AddChildrenForm extends Component {
    constructor(props) {
        super(props);
        this.nodeRoot = props.nodeRoot;
        this.state = {
            childrenCount: 1,
            children: {
                0: {
                    id: 0,
                    name: Consts.initialUsername()
                }
            }
        };

        this.addChildToState = this.addChildToState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.getChildren = this.getChildren.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        //TODO: children submit.
        console.log(this.state);
    }

    addChildToState(event) {
        event.preventDefault(); // Form submission.
        let newChild = {
            id: this.state.childrenCount,
            name: Consts.initialUsername(),
        };
        let children = this.state.children;
        children[newChild.id] = newChild;
        this.setState(prevState => {
            return {
                childrenCount: prevState.childrenCount + 1,
                children: children
            };
        })
    }

    getChildren() {
        let arr = [];
        let children = this.state.children;
        for (let child in children) {
            arr.push(children[child]);
        }
        return arr;
    }

    updateState(sibling) {
        let children = this.state.children;
        children[sibling.id] = {
            id: sibling.id,
            name: sibling.name
        };
        this.setState(prevState => {
            return {
                childrenCount: prevState.childrenCount,
                children: children
            }
        });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Your Children</legend>
                    <Button onClick={this.addChildToState} color="info">Add Child</Button>
                    {this.getChildren().map(x => <SiblingsChildrenForm id={x.id} key={x.id} type="children" updateParentState={this.updateState} />)}
                    <Button color="success">Submit</Button>
                </FormGroup>
            </form>
        );
    }
}
 
