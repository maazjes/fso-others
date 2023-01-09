import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors from 'cors';

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    res.send('Hello');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
