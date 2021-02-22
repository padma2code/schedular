import { useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  const reducer = (state, action) => {

    switch(action.type) {
      case SET_DAY: {
        return { ...state, day: action.day }
      }
      case SET_APPLICATION_DATA: {
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      }
      case SET_INTERVIEW: {
        // Update the number of spots remaining
        const dayData = state.days.filter(d => d.name === state.day)

        const spotsCount = (day) => {
          let result = 0;
          day.appointments.forEach(appointment => {
            (!action.appointments[appointment].interview && result++)
          })
          return result;
        }

        const updatedDay = { ...dayData[0], spots: spotsCount(dayData[0])};
        const dayId = state.days.indexOf(dayData[0]);
        const days = [...state.days.slice(0, dayId),  updatedDay, ...state.days.slice( dayId + 1, state.days.length)];

        return { ...state, appointments: action.appointments, days };
      }
      default: {
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
      }
    }
  };
  
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({ type: SET_DAY, day});

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