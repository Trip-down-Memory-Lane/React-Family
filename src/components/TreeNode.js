import React, {Component} from "react";
import "../styles/TreeNode.css";

class TreeNode extends Component {
    /*
    * Props must look like this:
    * props:
    *     nodeRoot: <JSON> object of Node root person
    */

    constructor(props) {
        super(props);
        this.isLoggedInUser = props.nodeRoot.name;
        this.state = {
            nodeRoot: props.nodeRoot,
            spouse: props.nodeRoot.spouse,
            children: props.nodeRoot.children
        };

        TreeNode.addSpouseIfExists = TreeNode.addSpouseIfExists.bind(this);
    }

    set isLoggedInUser(rootName) { this._isLoggedInUser = rootName === `SoloChild`; } //TODO: Replace with: sessionStorage.getItem(`username`)
    get isLoggedInUser() { return this._isLoggedInUser; }

    static addSpouseIfExists(spouse) {
        if (spouse) {
            return <Person type="spouse" name={this.state.spouse.name} />;
        }
    }

    static addChildrenIfExist(children) {
        if (children)
            return (
            <div className="children">
                {children.map(x => TreeNode.addChild(x))}
            </div>
        );
    }

    static addChild(child) {
        return <TreeNode key={child._id} nodeRoot={child}/>;
    }

    addNodeRoot(rootName) {
        let id;
        if (this.isLoggedInUser) {
            id = `currentUser`;
        }

        return <Person type="nodeRoot" id={id} name={rootName} />
    }

    addNode(node) {
        if (node.children) {
            return (
                <div className="node" id={this.props.id}>
                    <div className="parents">
                        {this.addNodeRoot(this.state.nodeRoot.name)}
                        {TreeNode.addSpouseIfExists(this.state.spouse)}
                    </div>
                    {TreeNode.addChildrenIfExist(this.state.children)}
                </div>
            );
        } else {
            return(
                <div className="node" id={this.props.id}>
                    <div className="soloChild">
                        {this.addNodeRoot(this.state.nodeRoot.name)}
                        {TreeNode.addSpouseIfExists(this.state.spouse)}
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

class Person extends Component {
    render() {
        console.log(this.props.name, this.props.id);
        return(
            <div className={this.props.type} id={this.props.id} >
                <div className="person">
                    {this.props.name}
                </div>
            </div>
        );
    }
}

export default TreeNode;
