import React, {Component} from "react";

import TreeNode from "../components/TreeNode";
// import "../styles/TreeNode.css";

class FamilyTree extends Component {
    /*
    * props:
    *     user: <logged in user>
    */

    constructor(props) {
        super(props);
        this.state = {
            treeRoot: {
                name: `TreeRoot`,
                _id: 1,
                spouse: {name:`TreeRoot Spouse`},
                children: [
                    {
                        name: `SoloChild`,
                        _id: 2
                    },
                    {
                        name: `FamilyChild`,
                        _id: 3,
                        spouse: {name: `FamilyChild Souse`},
                        children: [
                            {
                                name: `SoloGrandChild 1`,
                                _id: 4
                            },
                            {
                                name: `SoloGrandChild 2`,
                                _id: 5,
                                spouse: {name: `SoloGrandChild 2 spouse`}
                            }
                        ]
                    }
                ]
            }
        };
    }

    render() {
        let root = this.state.treeRoot;
        console.log(`In FamilyTree`, root);
        return(
            <TreeNode key={root._id} id="root" nodeRoot={this.state.treeRoot} />
        );
    }
}
 
export default FamilyTree;