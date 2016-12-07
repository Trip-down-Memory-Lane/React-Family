import React, {Component} from "react";

export default class Person extends Component {
    /*
    * Person has two usages:
    *   -nodeRoot ( as parent or child ). This person is node of the family tree
    *       props:
    *       -type="nodeRoot" ! must
    *       -selectPerson: function from FamilyTree. Shows Selected Person
    *       -rootParent: carries Person's root parent
    *       -person: Person's data - id, name, spouse, children
    *       -isTreeRoot: True or false, root of the entire tree.
    *       -isLoggedInUser: html id selector, to color Person differently, it it is the currently logged in user.
    *-----OR------
    *   -spouse ( as spouse of parent of child ). Since his/hers family is not part of this tree, no interractions are needed.
    *       props:
    *       -type="spouse"
    *       -selectPerson - must contain empty function, or function, which displays informative message. If there is no function, expect error
    *       -person: - data about this Person - name, id
    * */
    constructor(props) {
        super(props);
        this.rootParent = props.rootParent;
        this.person = props.person;
        this.isTreeRoot = props.isTreeRoot;
        this.state = {
            selected: false
        };

        this.select = this.select.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            selected: props.selected
        });
    }

    select() {
        let data = {
            isTreeRoot: this.isTreeRoot,
            rootParent: this.rootParent,
            person: this.person,
        };

        this.props.selectPerson(data);
    }

    render() {
        return(
            <div onClick={this.select} className={this.props.type} id={this.props.isLoggedInUser}>
                <div className="person">
                    <span>{this.props.type === "spouse"? this.props.person: this.props.person.name}</span>
                </div>
            </div>
        );
    }
}
 
