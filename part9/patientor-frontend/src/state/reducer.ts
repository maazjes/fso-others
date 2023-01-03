import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'CHANGE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'CHANGE_PATIENT':
      return {
        ...state,
        patient: action.payload
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: action.payload
      };
    case 'ADD_ENTRY':
      if (!state.patient || !state.patient.entries) {
        throw new Error('patient or entries missing');
      }
      return {
        ...state,
        patient: { ...state.patient, entries: [...state.patient.entries].concat(action.payload) }
      };
    default:
      return state;
  }
};

const setPatientList = (patientList: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patientList
});

const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient
});

const changePatient = (patient: Patient): Action => ({
  type: 'CHANGE_PATIENT',
  payload: patient
});

const setDiagnosisList = (diagnoseList: Diagnosis[]): Action => ({
  type: 'SET_DIAGNOSIS_LIST',
  payload: diagnoseList
});

const addEntry = (entry: Entry): Action => ({
  type: 'ADD_ENTRY',
  payload: entry
});

export { setPatientList, addPatient, changePatient, setDiagnosisList, addEntry };
