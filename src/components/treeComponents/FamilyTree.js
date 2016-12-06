import React, {Component} from "react";
import $ from "jquery";

import TreeNode from "./TreeNode";
import Measure from "react-measure";
import SelectedPerson from "./SelectedPerson";

function createRooTest() {
    return {
        name: `TreeRoot`,
        personIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
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
                        /*children: [
                            {
                                name: `SoloChild`,
                                _id: 5
                            },
                            {
                                name: `FamilyChild`,
                                _id: 6,
                                spouse: {name: `FamilyChild Souse`},
                                children: [
                                    {
                                        name: `SoloGrandChild 1`,
                                        _id: 7
                                    },
                                    {
                                        name: `SoloGrandChild 2`,
                                        _id: 8,
                                        spouse: {name: `SoloGrandChild 2 spouse`}
                                    }
                                ]
                            }
                        ]*/
                    },
                    {
                        name: `SoloGrandChild 2`,
                        _id: 9,
                        spouse: {name: `SoloGrandChild 2 spouse`}
                        /*children: [
                            {
                                name: `SoloChild`,
                                _id: 10
                            },
                            {
                                name: `FamilyChild`,
                                _id: 11,
                                spouse: {name: `FamilyChild Souse`},
                                children: [
                                    {
                                        name: `SoloGrandChild 1`,
                                        _id: 12
                                    },
                                    {
                                        name: `SoloGrandChild 2`,
                                        _id: 13,
                                        spouse: {name: `SoloGrandChild 2 spouse`}
                                    }
                                ]
                            }
                        ]*/
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
        // this.state.treeRoot = props.treeRoot;
        // this.state.treeRoot = createRooTest();//TODO: replace with props.tree for production.
        this.state = {
            personSelected: false,
            treeRoot: props.treeRoot
        };

        this.isPersonSelected = this.isPersonSelected.bind(this);
        this.selectPerson = this.selectPerson.bind(this);
        this.deselectPerson = this.deselectPerson.bind(this);
        this.setContainerToTreeWidth = this.setContainerToTreeWidth.bind(this);
    }

    setContainerToTreeWidth(dimensions) {
        this.treeWidth = dimensions.width;
    }

    componentWillReceiveProps(props) {
        this.setState({
            treeRoot: props.treeRoot
        });
    }

    selectPerson(data) {
        this.setState({
            personSelected: true,
            isTreeRoot: data.isTreeRoot,
            rootParent: data.rootParent,
            nodeRoot: data.person
        });
    }

    deselectPerson() {
        this.setState({
            personSelected: false
        });
    }

    componentWillMount() {
        $(`#wrapper`).width(10000);
    }
    componentWillUpdate() {
        $(`#wrapper`).width(10000);
    }

    componentDidMount() {
        $(`#wrapper`).width(this.treeWidth);
    }
    componentDidUpdate() {
        $(`#wrapper`).width(this.treeWidth);
    }

    isPersonSelected() {
        if(this.state.personSelected) {
            return (
                <SelectedPerson
                    setTreeData={this.props.setTreeData}
                    isTreeRoot={this.state.isTreeRoot}
                    rootParent={this.state.rootParent}
                    nodeRoot={this.state.nodeRoot}
                    deselectPerson={this.deselectPerson} />
            );
        }
    }

    render() {
        console.log(`FamilyTree RENDERING`);
        return(
            <Measure
                onMeasure={this.setContainerToTreeWidth}
                blacklist={measureBlacklist}>
                <div>
                    {this.isPersonSelected()}
                    <TreeNode
                        key={this.state.treeRoot.id}
                        id="treeRoot"
                        nodeRoot={this.state.treeRoot}
                        isTreeRoot={true}
                        selectPerson={this.selectPerson} />
                </div>
            </Measure>
        );
    }
}