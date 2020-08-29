import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
