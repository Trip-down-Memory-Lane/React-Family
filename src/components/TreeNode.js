import React, {Component} from "react";

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
        }
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

    static processChild(child) {
        return <TreeNode nodeRoot={child.name} spouse={child.spouse} children={child.children} />;
    }

    render() {
        return(
            <div className="node">
                <div className="parents">
                    {() => <Person type="nodeRoot" name={this.state.nodeRoot} />}
                    {() => <Person type="spouse" name={this.state.spouse} />}
                </div>
                <div className="children">
                    {this.state.children.map((x) => TreeNode.processChild(x))}
                </div>
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

