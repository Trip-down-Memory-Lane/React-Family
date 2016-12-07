import React, {Component} from "react";
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
        TreeController.createTree(userData)
            .then((response) => {
                this.setTreeData(response);
                TreeController.setUserTreeId(userData, response._id);
            });
    }

    setTreeData(response) {
        let tree = TreeController.buildTree(response);
        sessionStorage.setItem(`treeId`, tree.treeId);
        this.updateState(tree);
    }

    updateState(tree) {
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
            return (
                <div id="wrapper">{this.state.info}</div>
            );
        } else {
            return (

                <div
                    onMouseMove={this.handleMouseMove}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    id="wrapper">
                    <FamilyTree
                        nodeRoot={this.state.tree}
                        loadTree={this.loadTree} />
                </div>
            );
        }
    }

    render() {
        return this.isLoading();
    }
}

