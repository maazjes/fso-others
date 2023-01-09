import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const weight = req.query.weight;
    const height = req.query.height;
    res.json({
        weight: weight,
        height: height,
        bmi: calculateBmi(Number(weight), Number(height))
    });
});

app.post('/exercises', (req, res) => {
    if (!req.body.daily_exercises || !req.body.target) {
        res.status(400).json({ error: 'parameters missing' });
    }
    if (isNaN(req.body.target) || req.body.daily_exercises.find((day: number) => isNaN(day))) {
        res.status(400).json({ error: 'malformatted parameters' });
    }
    const dailyExercises = req.body.daily_exercises.map((day: number) => Number(day));
    const target = Number(req.body.target);
    const exercises = calculateExercises(dailyExercises, target);
    res.json(exercises);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
