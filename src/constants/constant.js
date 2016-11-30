class Path {

    static localhost(){
        return 'http://localhost:3000/#/';
    }

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
        return 'login'
    }
    static editProfileView(){
        return 'profile/edit';
    }
    static familyTreeView(){
        return 'familyTree'
    }
}

export default Path
