import React, {Component} from "react";
import Consts from "../../constants/constant";

export default class SiblingsChildrenForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: Consts.initialUsername()
        };

        this.handleNameInput = this.handleNameInput.bind(this);
    }

    handleNameInput(event) {
        let name = event.target.value;
        this.setState(prevState => {
            return {
                id: prevState.id,
                name: name
            }
        }, () => this.props.updateParentState(this.state));
    }

    getPlaceholder() {
        if (this.props.type === `children`) {
            return `Child name..`;
        } else {
            return `Sibling name..`;
        }
    }

    render() {
        return(
            <input key={this.props.id} type="text" onKeyUp={this.handleNameInput} placeholder={this.getPlaceholder()} required/>
        )
    }
}
 
