export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {

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
