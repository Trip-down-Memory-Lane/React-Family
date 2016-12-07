import React, {Component} from "react";
import "../../styles/TreeNode.css";
import Person from "./Person";

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
        return this.addNode(this.state.nodeRoot);
    }
}
export default TreeNode;
