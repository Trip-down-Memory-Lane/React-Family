import TreeRequester from "../services/TreeRequester";

let treeId = null;
export default class TreeController {

    static loadTree(id) {
        treeId = id;
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

        TreeRequester.putNewRoot(newRoot)
            .then((response) => console.log(`parents posted successfully!`, response));
    }

    static addChildren(parent, children) {
        let parentId = parent.id;
        let allChildren = parent.children.push.apply(parent.children, children);
        TreeRequester.getTree(treeId)
            .then(addChildren);

        function addChildren(response) {
            let tree = response.tree;
            TreeController.add(tree, `id`, parentId, allChildren);
            TreeRequester.putNewChildren(tree)
                .then((response) => console.log(`children putted successfully`, response));
        }
    }

    static add(tree, key, parentId, relatives) {
        for (let prop in tree) {
            if (!tree.hasOwnProperty(prop)) continue;
            if (typeof tree[prop] == 'object') {
                TreeRequester.add(tree, key, parentId, relatives);
            } else if (prop == key && tree[key] == parentId) {
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
}



