import axios from "axios";

export class PatientService {
  baseUrl = `http://localhost:9090/CovidTracker.com/patients`;

  baseUrl1 = `http://localhost:9090/CovidTracker.com/hospital`;

  addPatient(hospitalId, patient) {
    return axios.post(this.baseUrl + "/addpatient", patient, {
      params: { hospitalId },
    });
  }

  addPatientTestDetails(patientId, covidTest) {
    return axios.post(this.baseUrl + "/addpatienttestdetails", covidTest, {
      params: { patientId },
    });
  }

  addPatientStatus(patientId, status) {
    return axios.post(this.baseUrl + "/addpatientstatus", status, {
      params: { patientId },
    });
  }

  modifyPatient(patient) {
    return axios.put(this.baseUrl + "/modifypatient", patient);
  }

  modifyPatientStatus(status) {
    return axios.put(this.baseUrl + "/modifypatientstatus", status);
  }

  getAllHospitals() {
    return axios.get(this.baseUrl1 + "/getallhospital");
  }
}
