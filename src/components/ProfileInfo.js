import React, {Component} from "react";

class Avatar extends Component{

    render(){
        return(
            <img style={{"paddingBottom":"3%"}} width="50%" height="95%" src={this.props.src} role="presentation"/>
        )
    }

}

export  default Avatar