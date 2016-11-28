import React, {Componet} from "react";

class Header extends Componet {
    static loggedIn() {
        return sessionStorage.getItem(`username`);
    }

    render() {
        if (Header.loggedIn()) {
            return(
                <header>
                    <a href="#" onClick={}>Home</a>
                    <a href="#" onClick={}>Login</a>
                    <a href="#" onClick={}>Register</a>
                </header>
            )
        } else {
            return(
                <header>
                    <a href="#" onClick={}>Home</a>
                    <a href="#" onClick={}>Family Tree</a>
                    <a href="#" onClick={}>Logout</a>
                </header>
            );
        }
    }
}

class Footer extends Componet {
    render() {
        return(
            <footer>jsApplication@SoftUni ReactJS teamwork project.</footer>
        )
    }
}
 
