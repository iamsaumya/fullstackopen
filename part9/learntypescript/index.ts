import express from 'express';
import bodyParser from 'body-parser';
import { calculateBMI } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

interface Body {
  daily_exercises: number[];
  target: number;
}
const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/calculate', (req, res) => {
  const { daily_exercises, target }: Body = req.body as Body;
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (
    !daily_exercises.every((de) => !isNaN(Number(de))) ||
    isNaN(Number(target))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  res.json(
    calculateExercise(
      daily_exercises.map((de) => Number(de)),
      Number(target)
    )
  );
});

app.get('/bmi', (req, res) => {
  if (
    req.query &&
    Object.keys(req.query).includes('weight') &&
    Object.keys(req.query).includes('height')
  )
    res.json(calculateBMI(Number(req.query.weight), Number(req.query.height)));
  else {
    res.status(400).json({
      error: 'malformatted parameters'
    });
  }
});
app.listen(3000, () => {
  console.log('listening on 3000 port');
});
