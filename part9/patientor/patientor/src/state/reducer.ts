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
      type: 'FETCHED_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY_TO_PATIENT';
      payload: Entry;
      patientID: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
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
    case 'FETCHED_PATIENT':
      return {
        ...state,
        confidentialPatientDetails: {
          ...state.confidentialPatientDetails,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosisList: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ [diagnosis.code]: diagnosis, ...memo }),
            {}
          )
        }
      };
    case 'ADD_ENTRY_TO_PATIENT': {
      const newPatients = state.confidentialPatientDetails[action.patientID];
      console.log(newPatients);
      newPatients.entries.push(action.payload);

      return {
        ...state,
        confidentialPatientDetails: {
          ...state.confidentialPatientDetails,
          [action.patientID]: newPatients
        }
      };
    }
    default:
      return state;
  }
};

export const setFetchedPatient = (patient: Patient): Action => {
  return { type: 'FETCHED_PATIENT', payload: patient };
};

export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patientListFromApi };
};

export const setDiagnosisList = (diagnosisCodes: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosisCodes };
};

export const setEntrytoPatient = (entry: Entry, patientID: string): Action => {
  return { type: 'ADD_ENTRY_TO_PATIENT', payload: entry, patientID };
};
