import React, {Component} from "react";

import TreeNode from "../components/TreeNode";
import Measure from "react-measure";
import $ from "jquery";

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
                        _id: 4,
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
                    },
                    {
                        name: `SoloGrandChild 2`,
                        _id: 5,
                        spouse: {name: `SoloGrandChild 2 spouse`},
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
                ]
            }
        ]
    }

}

const measureBlacklist = [`height`, `top`, `right`, `bottom`];

class FamilyTree extends Component {
    /*
    * props:
    *   -tree: <JSON> representing family tree
    */

    constructor(props) {
        super(props);
        this.state = {
            root: createRooTest(), //TODO: replace with props.tree for production.
            width: 10000
        };

        this.refreshStateWidth = this.refreshStateWidth.bind(this);
        this.handleTreeWidth = this.handleTreeWidth.bind(this);
        // this.componentDidUpdate = this.componentDidUpdate.bind(this);
        // this.componentWillMount = this.componentWillMount.bind(this);
    }

    refreshStateWidth() {
        console.log(`updateState`);
        this.setState({
            root: this.state.root,
            width: 10000
        }, () => {
            $(`body`).width(this.state.width);
            console.log(`updated state`);
        });
    }

    componentDidMount() {
        console.log(`measuring after mount`);
    }

    // Called after state is updated. Sets initial body width to absurdly large value, which would hold any tree.
    componentDidUpdate() {
        console.log(`measuring after update`);
        this.measure();
    }

    // Same as above. It executes only on first render, while componentDidMount would execute only on change.
    // componentWillMount() {
    //     console.log(`COMPONENT WILL MOUNT`);
    //     $(`body`).width(this.state.width);
    // }

    // componentDidMount() {
    //     console.log(`COMPONENT DID MOUNT`, this.state);
    //     $(`body`).width(this.state.width);
    // }

    // As TreeNode renders onMeasure is triggered and sets body width to the measured width of the root TreeNode
    handleTreeWidth(dimensions) {
        console.log(`updating sate after measurement`);
        // this.setState(prevState => {
        //     return {
        //         root: prevState.root,
        //         width: dimensions.width
        //     }
        // }, () => {
        //     console.log(`setting body width to measured.`);
        //     $(`body`).width(this.state.width)
        // });
        $(`body`).width(dimensions.width);
    }

    render() {
        let root = this.state.root;
        console.log(`rendering`);
        return(
            <Measure onMeasure={this.handleTreeWidth} blacklist={measureBlacklist}>
                <TreeNode key={root._id}
                          id="root"
                          nodeRoot={root}
                          treeRoot={true}
                          refreshFamilyTreeState={this.refreshStateWidth}/>
            </Measure>
        );
    }
}
 
export default FamilyTree;