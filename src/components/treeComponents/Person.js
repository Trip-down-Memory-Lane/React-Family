import React, {Component} from "react";

export default class Person extends Component {
    constructor(props) {
        super(props);
        this.rootParent = props.rootParent;
        this.nodeRoot = props.nodeRoot;
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

    // getClassName() {
    //     if (this.state.selected) {
    //         return `person selected`;
    //     } else {
    //         return `person`;
    //     }
    // }

    // updateState() {
    //     this.setState(prevState => {
    //         return {
    //             selected: !prevState.selected
    //         }
    //     });
    // }

    select() {
        let data = {
            isTreeRoot: this.isTreeRoot,
            rootParent: this.rootParent,
            nodeRoot: this.nodeRoot,
        };

        this.props.selectPerson(data);
    }

    render() {
        return(
            <div onClick={this.select} className={this.props.type} id={this.props.id}>
                <div className="person">
                    <span>{this.props.name}</span>
                </div>
            </div>
        );
    }
    // render() {
    //     return(
    //         <div onClick={this.updateState} className={this.props.type} id={this.props.id}>
    //             <div className={this.getClassName()} onClick={Person.preventEventPropagation}>
    //                 <span>{this.props.name}</span>
    //                 {this.state.selected? <EditTree
    //                     isTreeRoot={this.isTreeRoot}
    //                     rootParent={this.rootParent}
    //                     nodeRoot={this.nodeRoot}
    //                     refreshFamilyTreeState={this.props.refreshFamilyTreeState}/> : null
    //                 }
    //             </div>
    //         </div>
    //     );
    // }
}
 
