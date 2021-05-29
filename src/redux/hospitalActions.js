import { HospitalService } from "../service/hospitalservice/HospitalService";
import {
  FETCH_HOSPITALS_REQUEST,
  FETCH_HOSPITALS_SUCCESS,
  FETCH_HOSPITALS_FAILURE,
} from "./hospitalTypes";

export const fetchHospitals = () => {
  // alert("fetching data from database.");
  return (dispatch) => {
    dispatch(fetchHospitalsRequest());
    let service = new HospitalService();
    service.getAllHospitals().then((response) => {
      const hospitals = response.data;
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
