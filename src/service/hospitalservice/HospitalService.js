import axios from "axios";

export class HospitalService {
  baseUrl = `http://localhost:9090/CovidTracker.com/hospital`;

  getAllHospitals() {
    return axios.get(this.baseUrl + "/");
  }
  getAllHospitalType() {
    return axios.get(this.baseUrl + "/allHospitalType");
  }
  getAllHospitalZone() {
    return axios.get(this.baseUrl + "/allHospitalZone");
  }
  addHospitalZone(zone) {
    return axios.post(this.baseUrl + "/addHospitalZone", zone);
  }
}
