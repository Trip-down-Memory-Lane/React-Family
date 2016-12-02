import React from 'react';
import { Button } from 'reactstrap';

export default class CreateTreeButton extends React.Component {
    render() {
        return (
            <div >
                {' Create'}  <Button size="lg" outline color="danger" >NOW</Button>{' your own family tree'}

            </div>
        );
    }
}