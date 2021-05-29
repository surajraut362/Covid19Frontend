import axios from "axios";

export class DeathService {
  baseUrl = `http://localhost:9090/CovidTracker.com/deathstatistic`;

  findtotalMonthWiseDeath(month) {
    return axios.get(`${this.baseUrl}/monthWiseDeath/${month}`);
  }
  findtotalDivisionWiseDeath(hospitalZone) {
    return axios.get(`${this.baseUrl}/divisionWiseDeath/${hospitalZone}`);
  }
  findtotalAgeWiseDeath(fromAge, toAge) {
    return axios.get(`${this.baseUrl}/ageWiseDeath`, {
      params: {
        fromAge,
        toAge,
      },
    });
  }
  findtotalGenderWiseDeath(gender) {
    return axios.get(`${this.baseUrl}/genderWiseDeath/${gender}`);
  }
}
