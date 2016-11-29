import React, {Component} from "react";

class Header extends Component {
    static loggedIn() {
        return sessionStorage.getItem(`username`);
    }

    render() {
        if (Header.loggedIn()) {
            return(
                <header>
                    <a href="#">Home</a>
                    <a href="#">Login</a>
                    <a href="#">Register</a>
                </header>
            )
        } else {
            return(
                <header>
                    <a href="#">Home</a>
                    <a href="#">Family Tree</a>
                    <a href="#">Logout</a>
                </header>
            );
        }
    }
}

class Footer extends Component {
    render() {
        return(
            <footer>jsApplication@SoftUni ReactJS teamwork project.</footer>
        )
    }
}

export {Header, Footer};
 
