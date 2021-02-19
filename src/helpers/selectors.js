function getAppointmentsForDay(state, day) {
  const result = [];
  const dayData = state.days.filter(d => d.name === day)
  if (!dayData[0]) return result;
  for (const a of dayData[0].appointments) {
    result.push(state.appointments[a]);
  }
  return result;

  // Showed by a mentor but to uncomfortable with reduce to use/understand it
  // if (!state) return []
  // const dayData = state.days.filter(d => d.name === day)
  // if (dayData.length === 0) return [];
  // return dayData[0].appointments.reduce((cum, cur) => cum.concat(state.appointments[cur]), [])
};

function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    // const interviewerData = state.interviewers.filter(i => i.id === interview.interviewer)
    return { ...interview, interviewer };
  }
  return null;
}

export { getAppointmentsForDay, getInterview };