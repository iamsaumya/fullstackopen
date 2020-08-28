import diagnoses from '../data/diagnoses';
import { DiagnosesEntry } from '../types';

const getDiagnoses = (): Array<DiagnosesEntry> => {
  return diagnoses;
};

export default { getDiagnoses };
