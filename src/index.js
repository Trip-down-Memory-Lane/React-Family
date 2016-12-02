import './index.css';
import ViewManager from './controllers/ViewManager';

import React from "react";
import ReactDOM from "react-dom";
import FamilyTreeView from "./views/FamilyTreeView";

ReactDOM.render(
    <FamilyTreeView />,
    document.getElementById(`root`)
);


// ViewManager.changeView();

