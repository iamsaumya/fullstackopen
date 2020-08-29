import { v4 as uuid } from 'uuid';
import patients from '../data/patients';
import { patientsWithoutSSN, newPatientEntry, PatientEntry } from '../types';

const getPatients = (): patientsWithoutSSN[] => {
  return patients.map(({ id, name, gender, occupation, dateOfBirth }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const postPatients = (newPatient: newPatientEntry): PatientEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newPatientWithID = {
    id,
    ...newPatient
  };
  patients.push(newPatientWithID);
  return newPatientWithID;
};

export default {
  getPatients,
  postPatients
};
