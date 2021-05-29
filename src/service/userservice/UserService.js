import axios from "axios";
export class UserService {
  baseURL = "http://localhost:9090/CovidTracker.com/status";

  findTotalCases() {
    return axios.get(`${this.baseURL}/totalcases`);
  }
  findTotalCasesIn24Hrs() {
    return axios.get(`${this.baseURL}/totalcasesIn24Hrs`);
  }
  findTotalLabTest() {
    return axios.get(`${this.baseURL}/totalLabTest`);
  }
  findTotalConfirmedCases() {
    return axios.get(`${this.baseURL}/totalConfirmedCases`);
  }
  findTotalRecoveredCases() {
    return axios.get(`${this.baseURL}/totalRecoverCases`);
  }
  findTotalPatientInIsolation() {
    return axios.get(`${this.baseURL}/totalPatientInIsolation`);
  }
  findTotalDeath() {
    return axios.get(`${this.baseURL}/totalDeath`);
  }
  findTotalDataBasedOnZoneAndDate() {
    return axios.get(`${this.baseURL}/totalDataBasedOnZoneAndDate/`);
  }
  findTotalDataBasedOnZone() {
    return axios.get(`${this.baseURL}/totalDataBasedOnZone`);
  }
}
