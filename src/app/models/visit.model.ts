import {Doctor} from './doctor.model';

export interface Visit {
  id: number;
  date: any;
  time: string;
  doctor: Doctor;
}
