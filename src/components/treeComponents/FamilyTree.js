import React, {Component} from "react";
import $ from "jquery";

import TreeNode from "./TreeNode";
import Measure from "react-measure";
import SelectedPerson from "./SelectedPerson";

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

export default class FamilyTree extends Component {
    /*
    * props:
    *   -tree: <JSON> representing family tree
    */

    constructor(props) {
        super(props);
        this.treeWidth = null;
        this.treeRoot = createRooTest(); //TODO: replace with props.tree for production.
        this.state = {
            personSelected: false
        };

        this.isPersonSelected = this.isPersonSelected.bind(this);
        this.selectPerson = this.selectPerson.bind(this);
        this.deselectPerson = this.deselectPerson.bind(this);
        this.setContainerToTreeWidth = this.setContainerToTreeWidth.bind(this);
    }

    setContainerToTreeWidth(dimensions) {
        this.treeWidth = dimensions.width;
    }

    selectPerson(data) {
        this.setState({
            personSelected: true,
            isTreeRoot: data.isTreeRoot,
            rootParent: data.rootParent,
            nodeRoot: data.nodeRoot
        });
    }

    deselectPerson() {
        this.setState({
            personSelected: false
        });
    }

    componentWillMount() {
        $(`body`).width(10000);
    }
    componentWillUpdate() {
        $(`body`).width(10000);
    }

    componentDidMount() {
        $(`body`).width(this.treeWidth);
    }
    componentDidUpdate() {
        $(`body`).width(this.treeWidth);
    }

    isPersonSelected() {
        if(this.state.personSelected) {
            return (
                <SelectedPerson
                    isTreeRoot={this.state.isTreeRoot}
                    rootParent={this.state.rootParent}
                    nodeRoot={this.state.nodeRoot}
                    deselectPerson={this.deselectPerson} />
            );
        }
    }

    render() {
        return(
            <Measure
                onMeasure={this.setContainerToTreeWidth}
                blacklist={measureBlacklist}>
                <div>
                    {this.isPersonSelected()}
                    <TreeNode
                        key={this.treeRoot._id}
                        id="treeRoot"
                        nodeRoot={this.treeRoot}
                        isTreeRoot={true}
                        selectPerson={this.selectPerson} />
                </div>
            </Measure>
        );
    }
}