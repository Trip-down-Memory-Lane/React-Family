class Consts {

    // static localhost(){
    //     return 'http://localhost:3000/#';
    // }

    static emptyString() { return ``; }

    static database() {
        return 'Kinvey ';
    }

    static initialUsername() {
        return '';
    }

    static initialPassword() {
        return '';
    }

    static initialConfirmPassword(){
        return '';
    }

    static registerView(){
        return 'register';
    }
    static loginView(){
        return '/'
    }
    static editProfileView(){
        return 'profile/edit';
    }
    static profileView(){
        return 'profile';
    }
    static familyTreeView(){
        return 'tree'
    }
}

export default Consts
