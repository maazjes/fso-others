import { diagnoses } from '../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => diagnoses;

export default { getEntries };
