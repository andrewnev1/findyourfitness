const router = require('express').Router();
let MealPlan = require('../models/meal-plan.model');

router.route('/').get((req, res) => {
    MealPlan.find()
    .then(mealplans => res.json(mealplans))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const meal = req.body.meal;
    const course = req.body.course;
    const calories = req.body.calories;
    const macros = req.body.macros;

    const newMealPlan = new MealPlan({
        username,
        meal,
        course,
        calories,
        macros
    });

    newMealPlan.save()
    .then(() => res.json('Meal Plan added'))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/:id').get((req, res) => {
    MealPlan.findById(req.params.id) //id from url
    .then(mealplans => res.json(mealplans))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/:id').delete((req, res) => {
    MealPlan.findByIdAndDelete(req.params.id)
    .then(() => res.json('Meal Plan deleted'))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/update/:id').post((req, res) => {
    MealPlan.findById(req.params.id)
    .then(mealplans => {
        mealplans.username = req.body.username;
        mealplans.meal = req.body.meal;
        mealplans.course = req.body.course;
        mealplans.calories = req.body.calories;
        mealplans.macros = req.body.macros;

        exercise.save()
        .then(() => res.json('Meal Plan updated'))
        .catch(err => res.status(400).json('Error ' +err));
    })
    .catch(err => res.status(400).json('Error' +err));
});

module.exports = router;