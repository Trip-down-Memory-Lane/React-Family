import Path from '../constants/constant';

class Navigator {

    navigate(pathname){

        window.location.href = Path.localhost() + pathname;
    }
}

let navigator = new Navigator();
export default navigator;