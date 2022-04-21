const router = require('express').Router();
let Exercise = require('../models/excerise.model');

router.route('/').get((req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const workout = req.body.workout;
    const exerciseType = req.body.exerciseType;
    const sets = Number(req.body.sets);
    const reps = Number(req.body.reps);
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        workout,
        exerciseType,
        sets,
        reps,
        duration,
        date,
    });

    newExercise.save()
    .then(() => res.json('Exercise added'))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id) //id from url
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error ' +err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.workout = req.body.workout;
        exercise.exerciseType = req.body.exerciseType;
        exercise.sets = Number(req.body.sets);
        exercise.reps = Number(req.body.reps);
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated'))
        .catch(err => res.status(400).json('Error ' +err));
    })
    .catch(err => res.status(400).json('Error' +err));
});

module.exports = router;