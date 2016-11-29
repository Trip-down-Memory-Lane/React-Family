import React from 'react';
import ReactDOM from 'react-dom';
import LoginView from './views/LoginView';
import './index.css';
import changeView from './controllers/viewManager';

changeView('login');
