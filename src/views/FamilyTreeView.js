import React, {Component} from "react";
import $ from "jquery";


import emptyTrees from "../utils/_DEV_empty_trees_table";


import Footer from "../components/Footer.js"
import FamilyTree from "../components/treeComponents/FamilyTree";
import TreeController from "../controllers/TreeController";

export default class FamilyTreeView extends Component {
    /*
    * props:
    *   tree: <JSON> object, representing family tree
    * */
    constructor() {
        super();
        this.state = {
            clickX: null,
            clicked: false,
            info: `Loading..`
        };

        this.updateState = this.updateState.bind(this);
        this.setUserData = this.setUserData.bind(this);
        this.setTreeData = this.setTreeData.bind(this);
        this.initTree = this.initTree.bind(this);
        this.loadTree = this.loadTree.bind(this);
        this.createTree = this.createTree.bind(this);

        // this.handleMouseDown = this.handleMouseDown.bind(this);
        // this.handleMouseMove = this.handleMouseMove.bind(this);
        // this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentWillMount() {
        let userId = sessionStorage.getItem(`userId`);
        TreeController.getUserData(userId, this.setUserData);
    }

    setUserData(response) {
        // this.userData = response;
        this.initTree(response);
    }

    initTree(userData) {
        if (userData.treeId) {
            this.loadTree(userData);
        } else {
            this.createTree(userData);
        }
    }

    loadTree(userData) {
        console.log(`LOADING TREE!!`, userData.treeId);
        TreeController.loadTree(userData.treeId)
            .then(this.setTreeData);
    }

    createTree(userData) {
        console.log(`CREATING TREE!!`, userData.treeId);
        TreeController.createTree(userData)
            .then((response) => {
                this.setTreeData(response);
                TreeController.setUserTreeId(userData, response._id);
            });
    }

    setTreeData(response) {
        let tree = TreeController.buildTree(response);
        this.updateState(tree);
    }

    updateState(tree) {
        // this.userData.treeId = tree.treeId;
        this.setState(prevState => {
            return {
                clickX: prevState.clickX,
                clicked: prevState.clicked,
                info: null,
                tree: tree
            }
        });
    }

    isLoading() {
        if (this.state.info) {
            console.log(`loading`);
            return (
                <div id="wrapper">{this.state.info}</div>
            );
        } else {
            console.log(`FamilyTreeView RENDERING!!`, this.state.tree);
            return (
                <div id="wrapper">
                    <div
                        onMouseMove={this.handleMouseMove}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        id="content">
                        <FamilyTree
                            treeRoot={this.state.tree}
                            setTreeData={this.setTreeData} />
                    </div>
                    <Footer/>
                </div>
            );
        }
    }

    // handleMouseDown(event) {
    //     let pageX = event.pageX;
    //     let pageY = event.pageY;
    //     this.setState(prevState => {
    //         return {componentWillRecieveProps
    //             clickX: pageX,
    //             clickY: pageY,
    //             clicked: true
    //         }
    //     });
    // }
    //
    // handleMouseMove(event) {
    //     if (this.state.clicked) {
    //         this.updateScrollPosition(event);
    //     }
    //
    // }
    //
    // handleMouseUp() {
    //     this.setState(prevState => {
    //         return {
    //             clickX: prevState.clickX,
    //             clicked: false
    //         }
    //     })
    // }
    //
    // updateScrollPosition(event) {
    //     $(document).css(`cursor`, `row-resize`);
    //     $(window).scrollLeft($(window).scrollLeft() + (this.state.clickX - event.pageX));
    //     $(window).scrollTop($(window).scrollTop() + (this.state.clickY - event.pageY));
    // }

    render() {
        return this.isLoading();
    }
}

