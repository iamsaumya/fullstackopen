import patients from '../data/patients';
import { patientsWithoutSSN } from '../types';

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
export default {
  getPatients
};
