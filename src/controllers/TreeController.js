import ViewManager from "./ViewManager";
import TreeModel from "../models/TreeModel";

class TreeController {
    constructor(username, id, treeId) {
        this.username = username;
        this.id = id;
        this.treeId = treeId;
    }

    static renderTree() {
        window.location.href = window.location.href + `/tree`;
    }

    static parentsAdded(parents) {
        TreeModel.addParents(parents);
    }

    static siblingsAdded(siblings) {
        TreeModel.addSiblings(siblings);
    }

    static childrenAdded(children) {
        TreeModel.addChildren(children);
    }



}
