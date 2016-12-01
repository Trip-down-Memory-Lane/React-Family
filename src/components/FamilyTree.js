import React, {Component} from "react";

import TreeNode from "../components/TreeNode";
// import "../styles/TreeNode.css";

function createRooTest() {
    // let root={};
    // root.name='TreeRoot';
    // root._id=1;
    // let spouse={name:`TreeRoot Spouse`};
    // root.spouse=spouse;
    // let child1 ={ name: `SoloChild`, _id: 2};
    // let child2={name: `FamilyChild`, _id: 3, spouse: {name: `FamilyChild Souse`}};
    // root.children=[child1,child2];
    // let child3= { name: `SoloGrandChild 1`, _id: 4 };
    // let child4= { name: `SoloGrandChild 2`, _id: 5 , spouse: {name: `SoloGrandChild 2 spouse`}};
    // child2.children=[child3,child4];
    return {
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

}

class FamilyTree extends Component {
    /*
    * props:
    *     user: <logged in user>
    */

    constructor(props) {
        super(props);
        this.state = {
            treeRoot: createRooTest()
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