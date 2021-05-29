import axios from "axios";

export class AdminService {
  baseUrl = `http://localhost:9090/CovidTracker.com/admin`;

  getAdminCredentials(login) {
    return axios.post(this.baseUrl + "/getAdminCredentials", login);
  }

  addHospital(hospital, zoneId, typeId, adminId) {
    return axios.post(this.baseUrl + "/addHospital", hospital, {
      params: { adminId, zoneId, typeId },
    });
  }
  addAdmin(admin) {
    return axios.post(this.baseUrl + "/addAdmin", admin);
  }
  removeHospital(hospitalId) {
    return axios.delete(`${this.baseUrl}/removeHospital`, {
      params: { hospitalId },
    });
  }
  modifyHospital(hospital) {
    return axios.put(this.baseUrl + "/modifyHospital", hospital);
  }
  getHospitalById(hospitalId) {
    return axios.get(this.baseUrl + "/getHospital", { params: { hospitalId } });
  }
  // addAdmin(admin){
  //     return axios.post(this.baseUrl + '/addAdmin',admin)
  // }
  // deleteHospital(hospitalId){
  //     return axios.delete(this.baseUrl + '/removeHospital',hospital,{params:{hospitalId}});
  // }
  // assignHospitalToAdmin(hospitalId,adminId){
  //     return axios.put(this.baseUrl + '/assignHospitalToAdmin',{params:{hospitalId,adminId}});
  // }
  // modifyHospital(hospital){
  //     return axios.put(this.baseUrl + '/modifyHospital',hospital)
  // }

  // getAdminById(adminId){
  //     return axios.get(this.baseUrl + '/getAdmin', admin,{params:{adminId}});
  // }
}
