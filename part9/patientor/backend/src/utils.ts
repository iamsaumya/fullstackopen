/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  newPatientEntry,
  Gender,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  BaseEntry,
  DiagnosesEntry,
  newEntry
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing Name ${name}`);
  }
  return name;
};

const isDate = (dob: string): boolean => {
  return Boolean(Date.parse(dob));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isBaseEntry = (entry: any): entry is BaseEntry => {
  if (entry.diagnosisCodes) {
    if (!parseDiagnosis(entry.diagnosisCodes)) {
      throw new Error(`Incorrect Diagnosis Code ${entry.diagnosis}`);
    }
  }

  if (
    !entry ||
    !isString(entry.id) ||
    !isString(entry.description) ||
    !isDate(entry.date) ||
    !isString(entry.specialist)
  ) {
    throw new Error('Incorrect id, description, date or specialist');
  }

  return entry;
};

const isNewBaseEntry = (entry: any): entry is BaseEntry => {
  if (entry.diagnosisCodes) {
    if (!parseDiagnosis(entry.diagnosisCodes)) {
      throw new Error(`Incorrect Diagnosis Code ${entry.diagnosis}`);
    }
  }

  if (
    !entry ||
    !isString(entry.description) ||
    !isDate(entry.date) ||
    !isString(entry.specialist)
  ) {
    throw new Error('Incorrect description, date or specialist');
  }

  return entry;
};
const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  if (
    entry.discharge &&
    Object.keys(entry.discharge).includes('date') &&
    Object.keys(entry.discharge).includes('criteria')
  ) {
    if (!isString(entry.discharge.criteria) || !isDate(entry.discharge.date)) {
      throw new Error('Incorrect discharge information');
    } else {
      return true;
    }
  }
  return false;
};

const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthcareEntry => {
  if (entry.employerName) {
    if (entry.sickLeave) {
      if (
        Object.keys(entry.sickLeave).includes('startDate') &&
        Object.keys(entry.sickLeave).includes('endDate')
      ) {
        if (
          !isDate(entry.sickLeave.startDate) ||
          !isDate(entry.sickLeave.endDate)
        ) {
          throw new Error('Incorrect Date for Sick Leave');
        } else return true;
      }
    }
    return true;
  }
  return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  if (
    entry.healthCheckRating === undefined &&
    !isString(entry.healthCheckRating)
  ) {
    return false;
  }
  return entry;
};

const parseDiagnosis = (
  diagnosisCodes: any
): diagnosisCodes is Array<DiagnosesEntry['code']> => {
  return diagnosisCodes.every((diagnosisCode: any) => isString(diagnosisCode));
};

const parseDOB = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Incorrect or missing DOB ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing SSN ${ssn}`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing Gender ${gender}`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing Occupation ${occupation}`);
  }
  return occupation;
};

const parseEntry = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error('Missing entries');
  }
  return entries.map((entry: any) => {
    if (!isBaseEntry(entry)) {
      throw new Error(`Not base entry ${entry}`);
    }
    if (isHospitalEntry(entry)) {
      return entry;
    } else if (isOccupationalHealthcareEntry(entry)) {
      return entry;
    } else if (isHealthCheckEntry(entry)) {
      return entry;
    } else {
      throw new Error(`Not an entry from the above types.`);
    }
  });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatientEntry = (object: any): newPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDOB(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntry(object.entries)
  };
};

const toNewEntry = (object: any): newEntry => {
  if (!isNewBaseEntry(object)) {
    throw new Error(`Not base entry ${object}`);
  }
  if (isHospitalEntry(object)) {
    return { ...object, type: 'Hospital' };
  } else if (isOccupationalHealthcareEntry(object)) {
    return { ...object, type: 'OccupationalHealthcare' };
  } else if (isHealthCheckEntry(object)) {
    return { ...object, type: 'HealthCheck' };
  } else {
    throw new Error(`Not an entry from the above types.`);
  }
};

export default { toNewPatientEntry, toNewEntry };
