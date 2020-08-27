import express from 'express';
import { calculateBMI } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
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
