const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    username: { type: String, required: true },
    meal: {type: String, required: true },
    course: { type: String, required: true },
    calories: { type: Number, required: true },
    macros: { type: String, required: true },
}, {
    timestamps: true,
});

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;