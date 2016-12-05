import React, {Component} from "react";
import {FormGroup, Button} from "reactstrap";
import Consts from "../../constants/constant";
import SiblingsChildrenForm from "./SiblingsChildrenForm";

export default class AddSiblingsForm extends Component {
    constructor(props) {
        super(props);
        this.rootParent = props.rootParent;
        this.nodeRoot = props.nodeRoot;
        this.state = {
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
        console.log(this.state);
        // let siblings = this.rootParent.children;
        // for(let sibling of this.state.siblings) {
        //     siblings.push(this.state.siblings[sibling]);
        // }
        //
        // KinveyRequester.addSiblings(siblings)
        //     .then(() => console.log(`Siblings added successfully`))
        //     .css(() => console.log(`error`));
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Your Siblings</legend>
                    <Button onClick={this.addSiblingToState} color="info">Add Child</Button>
                    {this.getSiblings().map(x => <SiblingsChildrenForm id={x.id} key={x.id} type="siblings" updateParentState={this.updateState} />)}
                    <Button color="success">Submit</Button>
                </FormGroup>
            </form>
        );
    }
}

 
