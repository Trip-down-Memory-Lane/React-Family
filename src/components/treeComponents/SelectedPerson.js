import React, {Component} from "react";
import AddChildren from "./AddChildren";
import AddSiblings from "./AddSiblings";
import AddParentsForm from "./AddParentsForm";
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

export default class SelectedPerson extends Component {
    constructor(props) {
        super(props);
        this.isTreeRoot = props.isTreeRoot;
        this.rootParent = props.rootParent;
        this.nodeRoot = props.nodeRoot;
        this.state = {
            dropdownOpen: false,
            editForm: null
        };

        this.toggle = this.toggle.bind(this);
        this.selectEditForm = this.selectEditForm.bind(this);
        this.isThisPersonTreeRoot = this.isThisPersonTreeRoot.bind(this);
    }

    toggle() {
        this.setState((prevState) => {
            return {
                dropdownOpen: !prevState.dropdownOpen,
                editForm: prevState.editForm
            }
        });
    }

    selectEditForm(type) {
        this.setState((prevState) => {
            return {
                dropdownOpen: prevState.dropdownOpen,
                editForm: type
            }
        });
    }

    addRelativeForm() {
        switch (this.state.editForm) {
            case`parents`: return <AddParentsForm nodeRoot={this.nodeRoot} />;
            case`siblings`: return <AddSiblings rootParent={this.rootParent} nodeRoot={this.nodeRoot} type="siblings"/>;
            case`children`: return <AddChildren  nodeRoot={this.nodeRoot} type="children"/>;
        }
    }

    static preventEventPropagation(event) {
        event.stopPropagation();
    }

    isThisPersonTreeRoot() {
        if (this.isTreeRoot) {
            return <DropdownItem onClick={() => this.selectEditForm(`parents`)}>Parent</DropdownItem>;
        } else {
            return <DropdownItem onClick={() => this.selectEditForm(`siblings`)}>Sibling</DropdownItem>
        }
    }

    render() {
        return(
            <div id="selected-background" onClick={this.props.deselectPerson}>
                <div id="person-selected" onClick={SelectedPerson.preventEventPropagation}>
                    <ButtonDropdown onClick={this.toggle} color="info" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Add relative
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.isThisPersonTreeRoot()}
                            <DropdownItem divider />
                            <DropdownItem onClick={() => this.selectEditForm(`children`)}>Child</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                    {this.addRelativeForm()}
                </div>
            </div>
        );
    }
}
