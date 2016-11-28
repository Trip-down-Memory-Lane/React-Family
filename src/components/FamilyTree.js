import React, {Component} from "react";

import TreeNode from "../components/TreeNode";

class FamilyTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPerson: props.person,
            treeRoot: null
        };


    }

    getRoot() {
        // TODO: GET to <Kinvey app>/treeIds/<props.person.treeId>
    }

    render() {
        let root = this.state.treeRoot;
        return(
            <TreeNode nodeRoot={root.name} spouse={root.spouse} chilcren={root.children} />
        );
    }
}
 
