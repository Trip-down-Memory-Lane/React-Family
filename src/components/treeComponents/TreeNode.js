import React, {Component} from "react";
import "../../styles/TreeNode.css";
import Person from "./Person";

class TreeNode extends Component {
    /*
    * Props must look like this:
    * props:
    *     nodeRoot: <JSON> representing tree node.
    */

    constructor(props) {
        super(props);
        this.isTreeRoot = props.isTreeRoot;
        this.isLoggedInUser = props.nodeRoot.name;
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

    set isLoggedInUser(rootName) { this._isLoggedInUser = rootName === `SoloChild`; } //TODO: Replace with: sessionStorage.getItem(`username`)
    get isLoggedInUser() { return this._isLoggedInUser; }

    addSpouseIfExists(spouse) {
        if (spouse) {
            return (
                <Person
                    selectPerson={() => console.log(`spouse`)} // handles error
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
        return (
            <TreeNode
                selectPerson={this.props.selectPerson}
                key={child._id}
                nodeRoot={child}
                rootParent={this.state.nodeRoot} />
        );
    }

    addNodeRoot(rootName) {
        let id;
        if (this.isLoggedInUser) {
            id = `currentUser`;
        }
        return (
            <Person
                selectPerson={this.props.selectPerson}
                rootParent={this.props.rootParent}
                nodeRoot={this.state.nodeRoot}
                isTreeRoot={this.isTreeRoot}
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

    render() {
        return(
            <div>
                {this.addNode(this.state.nodeRoot)}
            </div>
        );
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
