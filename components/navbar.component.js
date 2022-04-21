import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light shadow">
                
                    <Link to="/" className="nav-link"> <img src="LogoFYF.PNG"
                        width="60" height="60" className="d-inline-block align-top" alt="" /></Link>
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="navbar-nav me-auto mb-2 mb-lg-0">
                            <Link to="/exerciseList" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/meal-plan" className="nav-link">Meal Plans</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Exercise Log</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createMeal" className="nav-link">Create Meal Plan</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <NavLink to="/login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                                <i className="fa fa-sign-in me-2"></i>Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                                <i className="fa fa-user-plus me-2"></i>Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
                                <i className="fa fa-sign-out me-2"></i>Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}