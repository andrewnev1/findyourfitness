import React, { Component } from "react";
import axios from "axios";

export default class CreateMealPlan extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeMeal = this.onChangeMeal.bind(this);
        this.onChangeCourse = this.onChangeCourse.bind(this);
        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.onChangeMacros = this.onChangeMacros.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            meal: '',
            course: '',
            calories: 0,
            macros: '',
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeMeal(e) {
        this.setState({
            meal: e.target.value
        })
    }

    onChangeCourse(e) {
        this.setState({
            course: e.target.value
        })
    }

    onChangeCalories(e) {
        this.setState({
            calories: e.target.value
        })
    }

    onChangeMacros(e) {
        this.setState({
            macros: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const mealplan = {
            username: this.state.username,
            meal: this.state.meal,
            course: this.state.course,
            calories: this.state.calories,
            macros: this.state.macros
        }

        axios.post('http://localhost:5000/meal-plan/add', mealplan)
            .then(res => console.log(res.data));

        console.log(mealplan);

        window.location = '/meal-plan';
    }

    render() {
        return (
            <div>
                <div className="container shadow my-5" id="mealPlan">
                    <h3 className="display-4 mb-4 text-center text-white">Create Meal Plan</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group mb-3">
                            <label className="lead text-center fs-8 text-white">Username: </label>
                            <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function (user) {
                                        return <option
                                            key={user}
                                            value={user}>{user}
                                        </option>;
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lead text-center fs-8 text-white">Meal: </label>
                            <textarea
                                className="form-control"
                                value={this.state.meal}
                                onChange={this.onChangeMeal}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="lead text-center fs-8 text-white">Course: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.course}
                                onChange={this.onChangeCourse}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="lead text-center fs-8 text-white"> Calories: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.calories}
                                onChange={this.onChangeCalories}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="lead text-center fs-8 text-white">Macros: </label>
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.macros}
                                    onChange={this.onChangeMacros}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="Create Meal Plan" className="btn btn-outline-light ms-auto px-4 rounded-pill" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}