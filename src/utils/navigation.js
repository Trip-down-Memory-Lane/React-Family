import Path from '../constants/constant';

class Navigator {

    static redirect(){
        let pathname = window.location.pathname;
        window.location.href = Path.localhost() + pathname;
    }

    static navigate(pathname){

        window.location.href = Path.localhost() + pathname;
    }
}

export default Navigator;