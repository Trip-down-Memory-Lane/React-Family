import TreeRequester from "../services/TreeRequester";
import UserController from "./UserController";

export default class TreeController {
    static children = undefined;
    static parentId = undefined;

    static createTree(userData) {
        let name = `${userData.firstName} ${userData.lastName}`;
        // let idData = TreeController.generateId([], name);
        let id = sessionStorage.getItem(`userId`);
        let personIds = [id];

        let treeRoot = {
            name: name,
            spouse: userData.spouse,
            id: id,
            personIds: personIds
        };

        return TreeRequester.postNewTree(treeRoot);
    }

    static loadTree(id) {
        return TreeRequester.getTree(id);
    }

    static addParents(rootParent, spouse, child) {
        let treeId = child.treeId;
        let personIds = child.personIds;
        let newIds = TreeController.generateId(personIds, rootParent);
        let rootParentId = newIds.rootParentId;
        personIds = newIds.updatedIds;
        delete child.treeId;
        delete child.personIds;

        let newRoot = {
            name: rootParent,
            id: rootParentId,
            personIds: personIds,
            treeId: treeId,
            spouse: spouse,
            children: [child]
        };

        return TreeRequester.putNewRoot(newRoot);
    }

    static addRelative(parent, children) {
        console.log(`new children: `, children);
        console.log(`parent children: `, parent.children);
        let parentId = parent.id;
        if (parent.children) {
            children.push.apply(children, parent.children);
        }
        console.log(children);
        TreeController.children = children;
        TreeController.parentId = parentId;

        return TreeRequester.getTree(sessionStorage.getItem(`treeId`));
    }

    static handleRelative(response) {
        let tree = TreeController.buildTree(response);
        let childrenObjs = [];
        for (let child of TreeController.children) {
            let name = child.name;
            let idData = TreeController.generateId(tree.personIds, name);
            tree.personIds = idData.updatedIds;
            let id = idData.rootParentId;
            let spouse = child.spouse;
            let nestedChildren = child.children;

            childrenObjs.push({
                name: name,
                id: id,
                spouse: spouse,
                children: nestedChildren,
            });

            console.log(`processed children`, childrenObjs);
        }

        TreeController.add(tree, `id`, TreeController.parentId, childrenObjs);

        return TreeRequester.putNewChildren(tree);
            // .then((response) => {
            //     console.log(`children putted successfully`, response);
            //
            // });
    }

    static add(tree, key, parentId, relatives) {
        for (let prop in tree) {
            if (!tree.hasOwnProperty(prop)) continue;
            if (typeof tree[prop] === 'object') {
                TreeController.add(tree[prop], key, parentId, relatives);
            } else if (prop === key && tree[key] === parentId) {
                tree[`children`] = relatives;
            }
        }

        return tree;
    }

    static generateId(currentIds, personName) {
        let counter = (function() {
            let num = 0;
            return function() {
                return ++num;
            }
        })();

        let uniqueId = getUniqueId();
        currentIds.push(uniqueId);
        return {
            rootParentId: uniqueId,
            updatedIds: currentIds
        };

        function getUniqueId() {
            let id;
            if (currentIds.length % 2 === 1) {
                id = personName.substr(0, 3) + personName.substr(personName.length - 3) + counter();
            } else {
                id = personName.substr(personName.length - 3) + personName.substr(0, 3) + counter();
            }

            if (currentIds.indexOf(id) === -1) {
                return id;
            } else {
                return getUniqueId()
            }
        }
    }

    static getUserData(id, callback) {
        UserController.loadUserInfo(id, callback);
    }

    static setUserTreeId(userData, treeId, callback) {
        let userId = userData._id;
        let email = userData.email;
        let firstName = userData.firstName;
        let lastName = userData.lastName;
        let basicInfo = userData.basicInfo;
        let profilePicture = userData.profilePicture;

        let userInfo = {profilePicture, treeId, email, firstName, lastName, basicInfo};
        UserController.editUser(userId, userInfo, callback);
    }
    static buildTree(response) {
        let tree = response.tree;
        tree.treeId = response._id;

        return tree;
    }
}



