import React, {Component} from "react";
import "../styles/TreeNode.css";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import Path from "../constants/constant";

class TreeNode extends Component {
    /*
    * Props must look like this:
    * props:
    *     nodeRoot: <JSON> representing tree node.
    */

    constructor(props) {
        super(props);
        this.isLoggedInUser = props.nodeRoot.name;
        this.state = {
            nodeRoot: props.nodeRoot,
            spouse: props.nodeRoot.spouse,
            children: props.nodeRoot.children,
            selected: false
        };

        this.addSpouseIfExists = this.addSpouseIfExists.bind(this);
        this.addNode = this.addNode.bind(this);
        this.addNodeRoot = this.addNodeRoot.bind(this);
        this.addChildrenIfExist = this.addChildrenIfExist.bind(this);
        this.addChild = this.addChild.bind(this);
        this.addNodeRoot = this.addNodeRoot.bind(this);
        this.viewEditTree = this.viewEditTree.bind(this);
        this.addSpouseIfExists = this.addSpouseIfExists.bind(this);
    }

    set isLoggedInUser(rootName) { this._isLoggedInUser = rootName === `SoloChild`; } //TODO: Replace with: sessionStorage.getItem(`username`)
    get isLoggedInUser() { return this._isLoggedInUser; }

    addSpouseIfExists(spouse) {
        if (spouse) {
            return (
                <Person
                    refreshFamilyTreeState={this.props.refreshFamilyTreeState}
                    type="spouse"
                    name={this.state.spouse.name} />
            );
        }
    }

    addChildrenIfExist(children) {
        if (children)
            return (
                <div className="children">
                    {children.map(x => this.addChild(x))}
                </div>
        );
    }

    addChild(child) {
        return <TreeNode refreshFamilyTreeState={this.props.refreshFamilyTreeState} key={child._id} nodeRoot={child}/>;
    }

    addNodeRoot(rootName) {
        let id;
        if (this.isLoggedInUser) {
            id = `currentUser`;
        }
        return (
            <Person
                refreshFamilyTreeState={this.props.refreshFamilyTreeState}
                selected={this.state.selected}
                viewEditTree={this.viewEditTree}
                type="nodeRoot"
                id={id}
                name={rootName} />
        );
    }

    addNode(node) {
        if (node.children) {
            return (
                <div className="node" id={this.props.id}>
                    <div className="parents">
                        {this.addNodeRoot(this.state.nodeRoot.name)}
                        {this.addSpouseIfExists(this.state.spouse)}
                    </div>
                    {this.addChildrenIfExist(this.state.children)}
                </div>
            );
        } else {
            return(
                <div className="node" id={this.props.id}>
                    <div className="soloChild">
                        {this.addNodeRoot(this.state.nodeRoot.name)}
                        {this.addSpouseIfExists(this.state.spouse)}
                    </div>
                </div>
            );
        }
    }

    viewEditTree() {
        this.setState({
            nodeRoot: this.state.nodeRoot,
            spouse: this.state.spouse,
            children: this.state.children,
            selected: !this.state.selected //TODO: Implement proper logic
        });
    }

    render() {
        return(
            <div>
                {this.addNode(this.state.nodeRoot)}
            </div>
        );
    }
}

// Dependencies
class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            selected: props.selected
        });
    }

    getClassName() {
        if (this.state.selected) {
            return `person selected`;
        } else {
            return `person`;
        }
    }

    render() {
        return(
            <div onClick={this.props.viewEditTree} className={this.props.type} id={this.props.id}>
                <div className={this.getClassName()}>
                    <span>{this.props.name}</span>
                    {this.props.selected? <EditTree refreshFamilyTreeState={this.props.refreshFamilyTreeState}/> : null}
                </div>
            </div>
        );
    }
}

class EditTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            editForm: null
        };

        this.toggle = this.toggle.bind(this);
        this.selectEditForm = this.selectEditForm.bind(this);
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

    static preventEventPropagation(event) {
        event.stopPropagation();
    }

    componentWillUnmount() {
        console.log(`__EditTree componentWillUnmount__`);
        this.props.refreshFamilyTreeState();
    }

    render() {
        return(
            <div id="edit-tree" onClick={EditTree.preventEventPropagation}>
                <ButtonDropdown onClick={this.toggle} color="info" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Add relative
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.selectEditForm(`parent`)}>Parent</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.selectEditForm(`sibling`)}>Sibling</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.selectEditForm(`child`)}>Child</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                {this.state.editForm? <AddRelativeForm type={this.state.editForm} /> : null}
            </div>
        );
    }
}

class AddRelativeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: Path.initialUsername(),
            type: props.type,
            nodeRoot: false
        };

        this.handleCheckBoxInput = this.handleCheckBoxInput.bind(this);
        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState((prevState) => {
            return {
                name: prevState.name,
                type: props.type,
                nodeRoot: prevState.nodeRoot
            };
        });
    }

    handleNameInput(event) {
        let name = event.target.value;
        this.setState((prevState) => {
            return {
                name: name,
                type: prevState.type,
                nodeRoot: prevState.nodeRoot
            }
        });
    }

    handleCheckBoxInput(state) {
        this.setState((prevState) => {
            return {
                name: prevState.name,
                type: prevState.type,
                nodeRoot: state
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        //TODO: HTTP via kinveyRequester service.
    }

    addCheckBox() {
        return (
            <div>
                <span>nodeRoot</span>
                <CheckBox type="checkbox" handleChange={this.handleCheckBoxInput} value="nodeRoot" />
            </div>
        );
    }

    render() {
        return(
            <form id="add-relative" onSubmit={this.handleSubmit}>
                <input type="text" onKeyUp={this.handleNameInput} placeholder={this.state.type + ` name...`} required />
                {this.state.type === `parent`? this.addCheckBox(): null}
                <Button color="success">Submit</Button>
            </form>
        );
    }
}

class CheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState((prevState) => {
            return {
                selected: !prevState.selected
            };
        }, () => this.props.handleChange(this.state.selected));
    }

    render() {
        return(
            <input type="checkbox" onChange={this.handleChange} />
        );
    }
}

export default TreeNode;
