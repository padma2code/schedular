import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/application";

// Data and state management
export default function useApplicationData(initial) {
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  // Switch to a new day
  const setDay = day => dispatch({ type: SET_DAY, day});

  // Add the new interview in the appointments state and make the PUT request
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }));
  };

  // Remove the interview from the appointments state and make a DELETE request
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => dispatch({ type: SET_INTERVIEW, appointments }));
  };

  // Take all the data from the database to set up the initial state
  useEffect(() => {
    const promiseDays = axios.get("/api/days");
    const promiseAppointments = axios.get("/api/appointments");
    const promiseInterviewers = axios.get("/api/interviewers");

    Promise.all([promiseDays, promiseAppointments, promiseInterviewers])
      .then(all => {
        dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data  })
      })
  }, [])

  return { state, setDay, bookInterview, cancelInterview };
}