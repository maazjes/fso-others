import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getEntries().find((patient) => patient.id === req.params.id);
    if (patient) {
        res.json(patient);
    }
    res.status(404).send();
});

router.post('/', (req, res) => {
    console.log(req.body);
    const newPatient = toNewPatient(req.body);
    try {
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    console.log('hello', req.body);
    const newEntry = toNewEntry(req.body);
    try {
        const addedEntry = patientService.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    } catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
