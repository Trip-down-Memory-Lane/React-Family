import React, {Component} from "react";
import {FormGroup, Button} from "reactstrap";

import Consts from "../../constants/constant";
import SiblingsChildrenForm from "./SiblingsChildrenForm";
import TreeController from "../../controllers/TreeController";

export default class AddSiblingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rootParent: props.rootParent,
            siblingsCount: 1,
            siblings: {
                0: {
                    id: 0,
                    name: Consts.emptyString()
                }
            }
        };

        this.addSiblingToState = this.addSiblingToState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.getSiblings = this.getSiblings.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            rootParent: props.rootParent
        });
    }

    addSiblingToState(event) {
        event.preventDefault(); // Form submission.
        let newSibling = {
            id: this.state.siblingsCount,
            name: Consts.initialUsername(),
        };
        let siblings = this.state.siblings;
        siblings[newSibling.id] = newSibling;
        this.setState(prevState => {
            return {
                siblingsCount: prevState.siblingsCount + 1,
                siblings: siblings
            };
        })
    }

    getSiblings() {
        let arr = [];
        let siblings = this.state.siblings;
        for (let sibling in siblings) {
            arr.push(siblings[sibling]);
        }
        return arr;
    }

    updateState(sibling) {
        let siblings = this.state.siblings;
        siblings[sibling.id] = {
            id: sibling.id,
            name: sibling.name
        };
        this.setState(prevState => {
            return {
                siblingsCount: prevState.siblingsCount,
                siblings: siblings
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let siblings = [];
        for (let sibling in this.state.siblings) {
            siblings.push(this.state.siblings[sibling]);
        }
        console.log(`siblings: `, siblings);
        TreeController.addRelative(this.state.rootParent, siblings)
            .then((response) => {
                TreeController.handleRelative(response)
                    .then(() => {
                        let userData = {
                            treeId: sessionStorage.getItem(`treeId`)
                        };
                        this.props.loadTree(userData);
                    })
            });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Your Siblings</legend>
                    <Button onClick={this.addSiblingToState} color="info">Add Sibling</Button>
                    {this.getSiblings().map(x => <SiblingsChildrenForm id={x.id} key={x.id} type="siblings" updateParentState={this.updateState} />)}
                    <Button color="success">Submit</Button>
                </FormGroup>
            </form>
        );
    }
}

 
