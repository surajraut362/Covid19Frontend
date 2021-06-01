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
  async findAllAgeWiseDeath() {
    try {
      let ageWise = [];

      ageWise.push(await (await this.findtotalAgeWiseDeath(1, 17)).data);

      ageWise.push(await (await this.findtotalAgeWiseDeath(18, 30)).data);
      ageWise.push(await (await this.findtotalAgeWiseDeath(30, 50)).data);
      ageWise.push(await (await this.findtotalAgeWiseDeath(50, 1000)).data);
      return ageWise;
    } catch (err) {
      throw err;
    }
  }
  async findAllGenderWiseDeath() {
    try {
      let genderWise = [];

      genderWise.push(await (await this.findtotalGenderWiseDeath("Male")).data);
      genderWise.push(
        await (
          await this.findtotalGenderWiseDeath("Female")
        ).data
      );
      return genderWise;
    } catch (err) {
      throw err;
    }
  }
  async findAllMonthWiseDeath() {
    try {
      let monthWise = [];
      for (let i = 1; i <= 12; i++) {
        monthWise.push(await (await this.findtotalMonthWiseDeath(i)).data);
      }
      return monthWise;
    } catch (err) {
      throw err;
    }
  }
}
