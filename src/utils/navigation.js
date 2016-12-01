import Path from '../constants/constant';

class Navigator {
    navigate(pathName){
        window.location.href = Path.localhost() + pathName;
    }
}

let navigator = new Navigator();
export default navigator;