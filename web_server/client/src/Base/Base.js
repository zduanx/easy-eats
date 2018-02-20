import React from 'react';
import { NavLink } from 'react-router-dom';
import './Base.css'

class Base extends React.Component {
    componentWillMount(){
        document.addEventListener('DOMContentLoaded', this.toggleHandler);
    }
    toggleHandler(){
        // Get all "navbar-burger" elements
        var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        
        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
    
            // Add a click event on each of them
            $navbarBurgers.forEach(function ($el) {
                $el.addEventListener('click', function () {
        
                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);
        
                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
        
                });
            });
        };
    }

    componentWillUnmount(){
        document.removeEventListener('DOMContentLoaded', this.toggleHandler);
    }

    Login() {
        this.props.auth.login();
    }

    Logout() {
        this.props.auth.logout();
    }
    
    render() {
        const { isAuthenticated } = this.props.auth;

        return (
        <div>
            <nav className="navbar is-transparent">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                    <img src="Logo.png" alt="logo" width="112" height="28" />
                    </a>
                    <div className="navbar-burger burger" data-target="navMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                    </div>
                </div>

                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-start">
                        <NavLink className="navbar-item" exact to="/" activeClassName="is-active">
                            Home
                        </NavLink>
                        {
                            isAuthenticated() && 
                            <NavLink className="navbar-item" exact to="/search" activeClassName="is-active">
                                Search
                            </NavLink>
                        }
                    </div>

                    { !isAuthenticated() && 
                    <div className="navbar-end">
                        <div className="navbar-item">
                                <button className="button is-primary" onClick={()=>this.Login()}>
                                    Sign in / Sign up
                                </button>
                        </div>
                    </div>}
                    { isAuthenticated() && 
                    <div className="navbar-end">
                        <NavLink className="navbar-item" exact to="/profile" activeClassName="is-active">
                            Profile
                        </NavLink>
                        <div className="navbar-item">
                            <button className="button is-primary" onClick={()=>this.Logout()}>
                                Sign Out
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
            </nav>
        </div>
        );
    }
}

export default Base;