import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

import Home from "./components/home.component";
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import EditExercises from "./components/edit-exercises.component";
import CreateMealPlan from "./components/create-meal-plan.component";
import EditMealPlan from "./components/edit-meal-plan.component";
import MealPlanList from "./components/meal-plan-list.component";
import Login from "./components/login-component";
import Register from "./components/register-component";
import Logout from "./components/logout-component";
//import ProtectedRoute from "./ProtectedRoute";

function App() {

  //Check if logged in 
  //const [auth, setAuth] = useState(false);
  //const [auth1, setAuth1] = useState(true);

  /*const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      if (res.status === 200) {
        setAuth(true)
        setAuth(false)
      }

      if (res.status === 401) {
        setAuth(false)
        setAuth(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);*/

  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/exerciseList" exact element={<ExercisesList />} />
        <Route path="/meal-plan" exact element={<MealPlanList />} />
        <Route path="/edit/:id" element={<EditExercises />} />
        <Route path="/editMeal/:id" element={<EditMealPlan />} />
        <Route path="/create" element={<CreateExercise />} />
        <Route path="/createMeal" element={<CreateMealPlan />} />
        <Route path="/user" element={<CreateUser />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
