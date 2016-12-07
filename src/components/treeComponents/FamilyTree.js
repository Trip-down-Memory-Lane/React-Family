import React, {Component} from "react";
import $ from "jquery";

import TreeNode from "./TreeNode";
import Measure from "react-measure";
import SelectedPerson from "./SelectedPerson";

const measureBlacklist = [`height`, `top`, `right`, `bottom`];

export default class FamilyTree extends Component {
    /*
    * props:
    *   -tree: <JSON> representing family tree
    */

    constructor(props) {
        super(props);
        this.treeWidth = null;
        this.state = {
            personSelected: false,
            nodeRoot: props.nodeRoot
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
            nodeRoot: props.nodeRoot
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
            personSelected: false,
            isTreeRoot: null,
            rootParent: null
        });

        this.props.loadTree({
            treeId: sessionStorage.getItem(`treeId`)
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
        let totalWidth = 0;
        let firstTierChildren = $(`#treeRoot > .children > .node`);
        for (let child of firstTierChildren) {
            totalWidth += $(child).width() + 40;
        }
        totalWidth += 40;
        if (totalWidth < 300) {
            $(`#wrapper`).width(300 + totalWidth);
        } else {
            $(`#wrapper`).width(totalWidth);
        }




    }

    isPersonSelected() {
        if(this.state.personSelected) {
            return (
                <SelectedPerson
                    loadTree={this.props.loadTree}
                    isTreeRoot={this.state.isTreeRoot}
                    rootParent={this.state.rootParent}
                    nodeRoot={this.state.nodeRoot}
                    deselectPerson={this.deselectPerson} />
            );
        }
    }

    render() {
        return(
            <div>
                {this.isPersonSelected()}
                <Measure
                    onMeasure={this.setContainerToTreeWidth}
                    blacklist={measureBlacklist}>
                    <TreeNode
                        key={this.state.nodeRoot.id}
                        id="treeRoot"
                        nodeRoot={this.state.nodeRoot}
                        isTreeRoot={true}
                        selectPerson={this.selectPerson} />
                </Measure>
            </div>
        );
    }
}