import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <section id="home">
                <div className="container">
                    <div className="row justify-content-center">
                        <h1 className="display-4 fw-bolder mb-4 text-center text-white">
                            Find Your Fitness
                        </h1>
                        <p className="lead text-center fs-4 mb-5 text-white">
                            Welcome to the Find Your Fitness website {"\n"} {"\n"}
                            Help people achieve their fitness goals by creating exercise logs and meal plans to keep them on track!
                        </p>
                        <div className="buttons d-flex justify-content-center">
                            <button className="btn btn-light me-4 rounded-pill py-2">
                                <Link to="/exerciseList" className="nav-link">View Exercise Logs</Link>
                            </button>
                            <button className="btn btn-light me-4 rounded-pill py-2">
                                <Link to="/meal-plan" className="nav-link">View Meal Plans</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;