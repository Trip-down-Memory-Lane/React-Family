import React, {Component} from "react";
import Consts from "../../constants/constant";
import {Button, FormGroup, Label, Input} from "reactstrap";
import TreeController from "../../controllers/TreeController";

export default class AddParentsForm extends Component {
    constructor(props) {
        super(props);
        this.nodeRoot = props.nodeRoot;
        this.state = {
            rootParent: Consts.initialUsername(),
            father: Consts.initialUsername(),
            mother: Consts.initialUsername()
        };

        this.handleFatherNameInput = this.handleFatherNameInput.bind(this);
        this.handleMotherNameInput = this.handleMotherNameInput.bind(this);
        this.handleSelectRootInput = this.handleSelectRootInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFatherNameInput(event) {
        let name = event.target.value;
        this.setState((prevState) => {
            return {
                father: name,
                mother: prevState.mother,
                rootParent: prevState.rootParent
            }
        });
    }

    handleMotherNameInput(event) {
        let name = event.target.value;
        this.setState((prevState) => {
            return {
                father: prevState.father,
                mother: name,
                rootParent: prevState.rootParent
            }
        });
    }

    handleSelectRootInput(event) {
        let value = event.target.value.toLowerCase();
        this.setState(prevState => {
            return {
                father: prevState.father,
                mother: prevState.mother,
                rootParent: value
            };
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.rootParent === Consts.initialUsername()) {
            alert(`Please select root parent!`);
        } else {
            let rootParent = this.state[this.state.rootParent];
            let spouse = rootParent === this.state.father? this.state.mother : this.state.father;
            let child = this.nodeRoot;
            console.log(`AddParents Submit: `, rootParent, spouse, child);
            TreeController.addParents(rootParent, spouse, child)
                .then(this.props.setTreeData);
        }
    }

    //TODO: Implement required for Mather of Father input
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Your parents</legend>
                    <FormGroup>
                        <Label for="exampleSelect">Select</Label>
                        <Input
                            type="select"
                            name="select"
                            id="exampleSelect"
                            onChange={this.handleSelectRootInput}
                            required>
                            <option disabled selected value>Select root parent</option>
                            <option>Father</option>
                            <option>Mother</option>
                        </Input>
                    </FormGroup>
                    <input type="text" onKeyUp={this.handleFatherNameInput} placeholder="Father name.." />
                    <input type="text" onKeyUp={this.handleMotherNameInput} placeholder="Mother name.." />
                </FormGroup>
                <Button color="success">Submit</Button>
            </form>
        );
    }
}
 
