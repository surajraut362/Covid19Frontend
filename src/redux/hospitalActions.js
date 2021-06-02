import { AdminService } from "../service/adminservice/AdminService";
import {
  FETCH_HOSPITALS_REQUEST,
  FETCH_HOSPITALS_SUCCESS,
  FETCH_HOSPITALS_FAILURE,
} from "./hospitalTypes";

export const fetchHospitals = () => {
  // alert("fetching data from database.");
  return (dispatch) => {
    dispatch(fetchHospitalsRequest());
    let service = new AdminService();
    service
      .getAdminCredentials(JSON.parse(sessionStorage.getItem("username")))
      .then((response) => {
        const hospitals = response.data.hospitals;

        dispatch(fetchHospitalsSuccess(hospitals));
      })
      .catch((error) => {
        dispatch(fetchHospitalsFailure(error.message));
      });
  };
};

export const fetchHospitalsRequest = () => {
  return {
    type: FETCH_HOSPITALS_REQUEST,
  };
};

export const fetchHospitalsSuccess = (hospitals) => {
  return {
    type: FETCH_HOSPITALS_SUCCESS,
    payload: hospitals,
  };
};

export const fetchHospitalsFailure = (error) => {
  return {
    type: FETCH_HOSPITALS_FAILURE,
    payload: error,
  };
};
