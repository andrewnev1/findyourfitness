import React, { Component } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeWorkout = this.onChangeWorkout.bind(this);
        this.onChangeExerciseType = this.onChangeExerciseType.bind(this);
        this.onChangeSets = this.onChangeSets.bind(this);
        this.onChangeReps = this.onChangeReps.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            workout: '',
            textAreaValue: "",
            exerciseType: '',
            sets: 0,
            reps: 0,
            duration: 0,
            date: new Date(),
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

    onChangeWorkout(e) {
        this.setState({
            workout: e.target.value
        })
    }

    onChangeExerciseType(e) {
        this.setState({
            exerciseType: e.target.value
        })
    }

    onChangeSets(e) {
        this.setState({
            sets: e.target.value
        })
    }

    onChangeReps(e) {
        this.setState({
            reps: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            workout: this.state.workout,
            exerciseType: this.state.exerciseType,
            sets: this.state.sets,
            reps: this.state.reps,
            duration: this.state.duration,
            date: this.state.date
        }

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        console.log(exercise);

        window.location = '/exerciseList';
    }

    render() {
        return (
            <div>
                <div className="container shadow my-5" id="exercise">
                    <h3 className="display-4 mb-4 text-center text-white">Create New Exercise Log</h3>
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
                            <label className="lead text-center fs-8 text-white">Workout: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.workout}
                                onChange={this.onChangeWorkout}
                            />
                        </div>
                        <div className="row">
                            <div className="form-group mb-3 col-md-6">
                                <label className="lead text-center fs-8 text-white">Exercise: </label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.exerciseType}
                                    onChange={this.onChangeExerciseType}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label className="lead text-center fs-8 text-white"> Sets:  </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.sets}
                                    onChange={this.onChangeSets}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label className="lead text-center fs-8 text-white"> Reps:  </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.reps}
                                    onChange={this.onChangeReps}
                                />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <label className="lead text-center fs-8 text-white"> Duration (in minutes): </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.duration}
                                onChange={this.onChangeDuration}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="lead text-center fs-8 text-white">Date: </label>
                            <div>
                                <DatePicker
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Create Exercise Log" className="btn btn-outline-light ms-auto px-4 rounded-pill" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}