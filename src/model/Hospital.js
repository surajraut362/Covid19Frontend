import { HospitalZone } from "./HospitalZone";
import { HospitalType } from "./HospitalType";

export class Hospital {
  hospitalId = "";
  hospitalName = "";
  hospitalGeneralBed = "";
  hospitalICUBed = "";
  hospitalZone = new HospitalZone();
  hospitalType = new HospitalType();
  patients = [];
}
