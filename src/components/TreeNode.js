import React, {Component} from "react";
import "../styles/TreeNode.css";

class TreeNode extends Component {
    /*
    * Props must look like this:
    * props:
    *   nodeRoot: <string>
    *   spouse: <string>
    *   children: <JSON> of peoplegit
    */

    constructor(props) {
        super(props);
        this.state = {
            nodeRoot: props.nodeRoot,
            spouse: props.spouse,
            children: props.children
        };

        TreeNode.renderSpouseIfExists = TreeNode.renderSpouseIfExists.bind(this);
    }
// Weird
    // static processChildren(child) {
    //     // Version 1
    //     // if (child instanceof TreeNode) {
    //     //     return <TreeNode nodeRoot={child.nodeRoot} spouse={child.spouse} children={child.children} />
    //     // } else {
    //     //     return <Person type="child" name={child} />
    //     // }
    //
    //     // Version 2
    //     if (this.state.children)
    //         // Comes with the probably-totally wrong thingy bellow
    //         // return () => this.state.children.map((x) => TreeNode.addChildWithChildren(x));
    //         return <TreeNode nodeRoot={child.name} spouse={child.spouse} children={child.children} />;
    //     else
    //         return <Person type="child" name={this.state.nodeRoot} />
    // }

    // This is probably totally wrong and unnecessary.
    // static addChildWithChildren(child) {
    //     return <TreeNode nodeRoot={child.name} spouse={child.spouse} children={child.children} />;
    // }

    static renderSpouseIfExists(spouse) {
        if (spouse) {
            return <Person type="spouse" name={this.state.spouse.name} />;
        }
    }

    static mapChildrenIfExist(children) {
        if (children)
            return (
            <div className="children">
                {children.map(x => TreeNode.processChild(x))}
            </div>
        );
    }

    static processChild(child) {
        return <TreeNode key={child._id} nodeRoot={child.name} spouse={child.spouse} children={child.children} />;
    }

    render() {
        return(
            <div className="node">
                <div className="parents">
                    <Person type="nodeRoot" name={this.state.nodeRoot} />
                    {TreeNode.renderSpouseIfExists(this.state.spouse)}
                </div>
                {TreeNode.mapChildrenIfExist(this.state.children)}
            </div>
        )
    }
}

class Person extends Component {
    render() {
        return(
            <div className={this.props.type}><div className="person">{this.props.name}</div></div>
        );
    }
}

export default TreeNode;
