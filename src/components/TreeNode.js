import React, {Component} from "react";
import "../styles/TreeNode.css";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, FormGroup, Input, Label, Form, FormFeedback, FormText } from "reactstrap";
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

    viewEditTree(event) {
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
                <div className={this.getClassName()} onClick={Person.preventEventPropagation}>
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

    addRelativeForm() {
        switch (this.state.editForm) {
            case`parents`: return <AddParentsForm />;
            case`siblings`: return <AddSiblingsForm type="siblings"/>;
            case`children`: return <AddChildrenForm type="children"/>;
        }
    }

    static preventEventPropagation(event) {
        event.stopPropagation();
    }

    componentWillUnmount() {
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
                        <DropdownItem onClick={() => this.selectEditForm(`parents`)}>Parent</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.selectEditForm(`siblings`)}>Sibling</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => this.selectEditForm(`children`)}>Child</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                {this.addRelativeForm()}
            </div>
        );
    }
// {this.state.editForm? <AddRelativeForm type={this.state.editForm} /> : null}
}

class AddParentsForm extends Component {
    constructor() {
        super();
        this.state = {
            nodeRoot: Path.initialUsername(),
            father: Path.initialUsername(),
            mother: Path.initialUsername()
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
                nodeRoot: prevState.nodeRoot
            }
        });
    }

    handleMotherNameInput(event) {
        let name = event.target.value;
        this.setState((prevState) => {
            return {
                father: prevState.father,
                mother: name,
                nodeRoot: prevState.nodeRoot
            }
        });
    }

    handleSelectRootInput(event) {
        let value = event.target.value;
        this.setState(prevState => {
            return {
                father: prevState.father,
                mother: prevState.mother,
                nodeRoot: value
            };
        })
    }

    handleSubmit(event) {
        //TODO: KinveyRequester
        event.preventDefault();
        if (this.state.nodeRoot === Path.initialUsername()) {
            alert(`Please select root parent!`);
            return;
        } else {
            console.log(this.state);
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

class AddSiblingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siblingsCount: 1,
            siblings: {
                0: {
                    id: 0,
                    name: Path.initialUsername()
                }
            }
        };

        this.addSiblingToState = this.addSiblingToState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.getSiblings = this.getSiblings.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        switch (this.props.type) {
            case`children`: //TODO children request;
            case`siblings`: //TODO: siblings request;
        }
        console.log(this.state);
    }

    addSiblingToState(event) {
        event.preventDefault(); // Form submission.
        let newSibling = {
            id: this.state.siblingsCount,
            name: Path.initialUsername(),
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

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Your {this.props.type}</legend>
                    <Button onClick={this.addSiblingToState} color="info">Add Child</Button>
                    {this.getSiblings().map(x => <SiblingForm id={x.id} key={x.id} type="children" updateParentState={this.updateState} />)}
                    <Button color="success">Submit</Button>
                </FormGroup>
            </form>
        );
    }
}

class AddChildrenForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childrenCount: 1,
            children: {
                0: {
                    id: 0,
                    name: Path.initialUsername()
                }
            }
        };

        this.addChildToState = this.addChildToState.bind(this);
        this.updateState = this.updateState.bind(this);
        this.getChildren = this.getChildren.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        //TODO: children submit.
        console.log(this.state);
    }

    addChildToState(event) {
        event.preventDefault(); // Form submission.
        let newChild = {
            id: this.state.childrenCount,
            name: Path.initialUsername(),
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
                    <legend>Your {this.props.type}</legend>
                    <Button onClick={this.addChildToState} color="info">Add Child</Button>
                    {this.getChildren().map(x => <SiblingForm id={x.id} key={x.id} type="children" updateParentState={this.updateState} />)}
                    <Button color="success">Submit</Button>
                </FormGroup>
            </form>
        );
    }
}

class SiblingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: Path.initialUsername()
        };
        this.handleNameInput = this.handleNameInput.bind(this);
    }

    handleNameInput(event) {
        let name = event.target.value;
        this.setState(prevState => {
            return {
                id: prevState.id,
                name: name
            }
        }, () => this.props.updateParentState(this.state));
    }

    getPlaceholder() {
        if (this.props.type === `children`) {
            return `Child name..`;
        } else {
            return `Sibling name..`;
        }
    }

    render() {
        return(
            <input key={this.props.key} type="text" onKeyUp={this.handleNameInput} placeholder={this.getPlaceholder()} />
        )
    }
}

// class AddRelativeForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             nodeRoot: Path.initialUsername(),
//             spouse: Path.initialUsername(),
//             // nodeRoot: false
//         };
//
//         this.handleCheckBoxInput = this.handleCheckBoxInput.bind(this);
//         this.handleNameInput = this.handleNameInput.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     componentWillReceiveProps(props) {
//         this.setState((prevState) => {
//             return {
//                 name: prevState.name,
//                 type: props.type,
//                 nodeRoot: prevState.nodeRoot
//             };
//         });
//     }
//
//     handleNameInput(event) {
//         let name = event.target.value;
//         this.setState((prevState) => {
//             return {
//                 name: name,
//                 type: prevState.type,
//                 nodeRoot: prevState.nodeRoot
//             }
//         });
//     }
//
//     handleCheckBoxInput(state) {
//         this.setState((prevState) => {
//             return {
//                 name: prevState.name,
//                 type: prevState.type,
//                 nodeRoot: state
//             }
//         });
//     }
//
//     handleSubmit(event) {
//         event.preventDefault();
//         //TODO: HTTP via kinveyRequester service.
//     }
//
//     addCheckBox() {
//         return (
//             <div>
//                 <span>nodeRoot</span>
//                 <CheckBox type="checkbox" handleChange={this.handleCheckBoxInput} value="nodeRoot" />
//             </div>
//         );
//     }
//
//     render() {
//         return(
//             <form id="add-relative" onSubmit={this.handleSubmit}>
//                 <input type="text" onKeyUp={this.handleNameInput} placeholder={this.state.type + ` name...`} required />
//                 {this.state.type === `parents`? this.addCheckBox(): null}
//                 <Button color="success">Submit</Button>
//             </form>
//         );
//     }
// }

// class CheckBox extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selected: false
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//     }
//
//     handleChange() {
//         this.setState((prevState) => {
//             return {
//                 selected: !prevState.selected
//             };
//         }, () => this.props.handleChange(this.state.selected));
//     }
//
//     render() {
//         return(
//             <input type="checkbox" onChange={this.handleChange} />
//         );
//     }
// }

export default TreeNode;
