import patients from '../data/patients';
import { Patient, newPatient, PublicPatient, newEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Patient[] => patients;

const getNonSensitiveEntries = (): PublicPatient[] =>
    patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));

const addPatient = (data: newPatient): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const patient = { ...data, id: String(uuid()) };
    patients.push(patient);
    return patient;
};

const addEntry = (data: newEntry, id: string): Entry => {
    const patientById = getEntries().find((entry) => entry.id === id);
    if (!patientById) {
        throw new Error('patient id not found');
    }
    const entry = { ...data, id: uuid() };
    patientById.entries = patientById?.entries.concat(entry);
    return entry;
};

export default { getEntries, getNonSensitiveEntries, addPatient, addEntry };
