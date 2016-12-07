import React, {Component} from "react";
import {Button, FormGroup} from "reactstrap";
import $ from "jquery";

import SiblingsChildrenForm from "./SiblingsChildrenForm";
import Consts from "../../constants/constant";
import TreeController from "../../controllers/TreeController";

export default class AddChildrenForm extends Component {
    constructor(props) {
        super(props);
        // this.rootParent = props.rootParent;
        this.state = {
            nodeRoot: props.nodeRoot,
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

    componentWillReceiveProps(props) {
        console.log(`AddChildren WIllReceiveProps.`, props.nodeRoot);
        this.setState({
            nodeRoot: props.nodeRoot
        });
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

    handleSubmit(event) {
        event.preventDefault();
        let children = [];
        for (let child in this.state.children) {
            if(!this.state.children.hasOwnProperty(child)) continue;
            children.push(this.state.children[child]);
        }

        TreeController.addRelative(this.state.nodeRoot, children)
            .then((response) => {
                TreeController.handleRelative(response)
                    .then((response) => {
                        console.log(`addedChild response `, response);
                        let userData = {
                            treeId: sessionStorage.getItem(`treeId`)
                        };
                        this.props.loadTree(userData);
                    });
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
 
