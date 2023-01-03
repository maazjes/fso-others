import {
    newPatient,
    Gender,
    newEntry,
    HealthCheckRating,
    HealthCheckEntry,
    OccupationalHealthcareEntry,
    HospitalEntry,
    Discharge,
    SickLeave
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): newPatient => {
    const newPatient: newPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): newEntry => {
    const base = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        diagnosisCodes: object.diagnosisCodes
    };
    if (object.type === 'HealthCheck') {
        const healthCheck = {
            ...base,
            type: object.type as HealthCheckEntry['type'],
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
        return healthCheck;
    }
    if (object.type === 'Hospital') {
        const hospital = {
            ...base,
            type: object.type as HospitalEntry['type'],
            discharge: parseDischarge(object.discharge)
        };
        return hospital;
    }
    if (object.type === 'OccupationalHealthcare') {
        const occupational = {
            ...base,
            type: object.type as OccupationalHealthcareEntry['type'],
            employerName: parseString(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
        };
        return occupational;
    }
    throw new Error('invalid or missing entry fields');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (object: any): Discharge => {
    if (!object.criteria || !object.date) {
        throw new Error('incorrect or missing discharge: ' + object);
    }
    const discharge = {
        criteria: parseString(object.criteria),
        date: parseDate(object.date)
    };
    return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (object: any): SickLeave => {
    if (!object.startDate || !object.endDate) {
        throw new Error('incorrect or missing sickleave: ' + object);
    }
    const sickLeave = {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
    };
    return sickLeave;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (rating === undefined || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing string: ' + text);
    }
    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing Gender: ' + gender);
    }
    return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

export { toNewPatient, toNewEntry };
