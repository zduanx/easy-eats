import React from 'react';
import Auth from '../Auth/Auth';
import { Link } from 'react-router';
import './Base.css'


class Base extends React.Component {
    constructor(props){
        super(props);
        document.addEventListener('DOMContentLoaded', function () {
            
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
              }
            
            });
    }

    render() {
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
                        <a className="navbar-item" href="/">
                            Home
                        </a>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                            <p className="control">
                                <a className="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
                                <span className="icon">
                                    <i className="fab fa-twitter"></i>
                                </span>
                                <span>
                                    Tweet
                                </span>
                                </a>
                            </p>
                            <p className="control">
                                <a className="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
                                <span className="icon">
                                    <i className="fas fa-download"></i>
                                </span>
                                <span>Download</span>
                                </a>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </nav>


            
            {this.props.children}
        </div>
        );
    }
}

export default Base;