import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const PORT = 3001;

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
