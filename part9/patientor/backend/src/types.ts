export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type newPatientEntry = Omit<PatientEntry, 'id'>;
export type patientsWithoutSSN = Omit<PatientEntry, 'ssn'>;
