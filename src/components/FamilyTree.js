import React, {Component} from "react";

import TreeNode from "../components/TreeNode";
// import "../styles/TreeNode.css";

function createRooTest() {
    let root={};
    root.name='TreeRoot';
    root._id=1;
    let spouse={name:`TreeRoot Spouse`};
    root.spouse=spouse;
    let child1 ={ name: `SoloChild`, _id: 2};
    let child2={name: `FamilyChild`, _id: 3, spouse: {name: `FamilyChild Souse`}};
    root.children=[child1,child2];
    let child3= { name: `SoloGrandChild 1`, _id: 4 };
    let child4= { name: `SoloGrandChild 2`, _id: 5 , spouse: {name: `SoloGrandChild 2 spouse`}};
    child2.children=[child3,child4];
    return root;

}
class FamilyTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: props.user,
            treeRoot: createRooTest()
        };

    }

    // getTreeRoot() {
    //     return {
    //         name: `TreeRoot`,
    //         spouse: `TreeRoot Spouse`,
    //         children: [
    //             {
    //                 name: `SoloChild`
    //             },
    //             {
    //                 name: `FamilyChild`,
    //                 spouse: `FamilyChild Souse`,
    //                 children: [
    //                     {
    //                         name: `SoloGrandChild 1`
    //                     },
    //                     {
    //                         name: `SoloGrandChild 2`,
    //                         spouse: `SoloGrandChild 2 spouse`
    //                     }
    //                 ]
    //             }
    //         ]
    //     };
    // }

    // componentWillMount() {
    //     let treeRoot = this.getTreeRoot();
    //     this.setState({
    //         currentUser: this.props.user,
    //         treeRoot: treeRoot
    //     });
    // }

    render() {
        let root = this.state.treeRoot;
        return(
            <TreeNode key={root._id} nodeRoot={root.name} spouse={root.spouse.name} children={root.children} />
        );
    }
}
 
export default FamilyTree;