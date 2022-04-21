import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MealPlan = props => (
    <tr>
        <td>{props.mealplan.username}</td>
        <td>{props.mealplan.meal}</td>
        <td>{props.mealplan.course}</td>
        <td>{props.mealplan.calories}</td>
        <td>{props.mealplan.macros}</td>
        <td>
            <Link to={"/editMeal/"+props.mealplan._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMealPlan(props.mealplan._id) }}>delete</a>
        </td>
    </tr>
)

export default class MealPlanList extends Component {
    constructor(props) {
        super(props);

        this.deleteMealPlan = this.deleteMealPlan.bind(this);

        this.state = {mealplans: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/meal-plan/')
        .then(response => {
            this.setState({ mealplans: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteMealPlan(id) {
        axios.delete('http://localhost:5000/meal-plan/' +id)
            .then(res => console.log(res.data));

        this.setState({
            mealplan: this.state.mealplans.filter(el => el._id !== id)
        })
    }

    mealPlanList() {
        return this.state.mealplans.map(currentmealplan => {
            return <MealPlan mealplan={currentmealplan} deleteMealPlan={this.deleteMealPlan} key={currentmealplan._id}/>;
        })
    }


    render() {
        return (
            <div>
            <h3>Logged Meal Plans</h3>
            <table className="table table-striped">
              <thead className="thead-light">
                <tr className="table-primary">
                  <th>Username</th>
                  <th>Meal</th>
                  <th>Course</th>
                  <th>Calories</th>
                  <th>Macros</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.mealPlanList() }
              </tbody>
            </table>
          </div>
        )
    }
}