import React from 'react';
import { Button } from 'reactstrap';

export default class ViewTreeButton extends React.Component {
    render() {
        return (
            <div >
                 <Button size="lg" style={{"backgroundColor":"#00aeff","fontFamily":"Comic Sans MS"}}  outline color="primary" block >VIEW MY FAMILY TREE</Button>

            </div>
        );
    }
}