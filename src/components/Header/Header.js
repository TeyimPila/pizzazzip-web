import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-light alert-dark" style={{ padding: '20px 50px 20px 50px' }}>
        <a className="navbar-brand" href="/">
            PIZZAZZIP
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
            <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse " id="menu">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <div className="nav-link">
                        <NavLink to="/shop" activeClassName="menu selected">MENU</NavLink>
                    </div>
                </li>
                <li className="nav-item ">
                    <div className="nav-link">
                        <NavLink to="/about" activeClassName="menu selected">ABOUT</NavLink>
                    </div>
                </li>
            </ul>

            <ul className="navbar-nav justify-content-end">
                <li className="nav-item">
                    <div className="nav-link">
                        <NavLink to="/cart" activeClassName="menu selected">
                            <span>
                                <i className="fas fa-shopping-cart fa-2x" />
                                <sup className="badge badge-danger rounded-circle">5</sup>
                            </span>
                        </NavLink>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
);
