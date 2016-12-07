import React, {Component} from "react";
import "../../styles/TreeNode.css";
import Person from "./Person";
import $ from "jquery";

class TreeNode extends Component {
    /*
    * Props must look like this:
    * props:
    *   -key: id of every person ( for react's virtual DOM )
    *   -nodeRoot: JSON representing tree node.
    *   -isTreeRoot: This has to be true for the first time TreeNode is invoked.
    *   -selectPerson function from FamilyTree. It shows Selected Person and must be passed down the line to Person.
    */
    constructor(props) {
        super(props);
        this.isTreeRoot = props.isTreeRoot;
        this.isLoggedInUser = props.nodeRoot.id;
        this.state = {
            nodeRoot: props.nodeRoot,
            spouse: props.nodeRoot.spouse,
            children: props.nodeRoot.children,
        };

        this.addSpouseIfExists = this.addSpouseIfExists.bind(this);
        this.addNode = this.addNode.bind(this);
        this.addNodeRoot = this.addNodeRoot.bind(this);
        this.addChildrenIfExist = this.addChildrenIfExist.bind(this);
        this.addChild = this.addChild.bind(this);
        this.addNodeRoot = this.addNodeRoot.bind(this);
        this.addSpouseIfExists = this.addSpouseIfExists.bind(this);
    }

    set isLoggedInUser(rootName) { this._isLoggedInUser = rootName === sessionStorage.getItem(`userId`); }
    get isLoggedInUser() { return this._isLoggedInUser; }

    componentWillReceiveProps(props) {
        this.setState({
            nodeRoot: props.nodeRoot,
            spouse: props.nodeRoot.spouse,
            children: props.nodeRoot.children
        });
    }

    addSpouseIfExists() {
        let spouse = this.state.spouse;
        if (spouse) {
            return (
                <Person
                    selectPerson={() => console.log(`spouse`)} // handles error
                    type="spouse"
                    person={this.state.spouse} />
            );
        }
    }

    addChildrenIfExist() {
        let children = this.state.children;
        if (children)
            return (
                <div className="children">
                    {children.map(x => this.addChild(x))}
                </div>
        );
    }

    addChild(child) {
        return (
            <TreeNode
                selectPerson={this.props.selectPerson}
                key={child.id}
                nodeRoot={child}
                rootParent={this.state.nodeRoot} />
        );
    }

    addNodeRoot() {
        let id;
        if (this.isLoggedInUser) {
            id = `currentUser`;
        }
        return (
            <Person
                selectPerson={this.props.selectPerson}
                rootParent={this.props.rootParent}
                person={this.state.nodeRoot}
                isTreeRoot={this.isTreeRoot}
                type="nodeRoot"
                isLoggedInUser={id} />
        );
    }

    addNode(node) {
        if (node.children) {
            return (
                <div className="node" id={this.props.id}>
                    <div className="parents">
                        {this.addNodeRoot()}
                        {this.addSpouseIfExists()}
                    </div>
                    {this.addChildrenIfExist()}
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

    render() {
        // console.log(`TreeNode RENDERING`, $(`#wrapper`).width());
        return this.addNode(this.state.nodeRoot);
    }
}


// class AddRelativeForm extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             nodeRoot: Consts.initialUsername(),
//             spouse: Consts.initialUsername(),
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
