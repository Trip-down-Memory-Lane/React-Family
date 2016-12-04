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

    // refreshStateWidth is passed as prop down the chain and is called in TreeNode.js > EditTree component.
    refreshStateWidth() {
        console.log(`updateState`);
        this.setState({
            root: this.state.root,
            width: 10000
        }, () => {
            $(`body`).width(this.state.width); // Supposed to set body width to 10000px.
            console.log(`updated state`);
        });
    }

    // This is supposed to trigger measurement. This triggers after every refreshStateWidth()
    componentDidUpdate() {
        console.log(`measuring after mount`);
        this.measureComponent.measure();
    }

    // Same as above. Only it fires 1st time.
    componentDidMount() {
        console.log(`measuring after mount`);
        this.measureComponent.measure();
    }

    // Triggered by onMeasure. This sets body width to the proper measurement.
    handleTreeWidth(dimensions) {
        console.log(`updating sate after measurement`);
        $(`body`).width(dimensions.width);
    }

    render() {
        let root = this.state.root;
        return(
            <Measure
                onMeasure={this.handleTreeWidth}
                blacklist={measureBlacklist}
                ref={x => this.measureComponent = x}>
                <TreeNode key={root._id}
                          id="root"
                          nodeRoot={root}
                          isTreeRoot={true}
                          refreshFamilyTreeState={this.refreshStateWidth}/>
            </Measure>
        );
    }
}
 
export default FamilyTree;