import './index.css';
import Path from '../src/constants/constant'
import changeView from './controllers/ViewManager';

sessionStorage.clear();
changeView();

