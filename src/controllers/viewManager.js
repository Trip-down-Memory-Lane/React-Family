import React, {Component} from 'react';
import $ from 'jquery'
import ReactDOM from 'react-dom';
import Login from '../views/LoginView'
import Register from '../views/RegisterView'


function changeView(view, id) {
    let component;
    switch(view) {
        case`login`: component = <Login/>; break;
        case`register`: component = <Register/>; break;

        default: break;
    }

    ReactDOM.render(
        component,
        $(`#root`)[0]
    );
}

export default changeView;