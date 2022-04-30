export function getAppointmentsForDay(state, day) {
  const daysObject = state.days.find((dai) => dai.name === day);

  if (!daysObject) {
    return [];
  }

  const daysAppointment = daysObject.appointments;

  const stateAppointments = daysAppointment.map((appointmentID) => {
    return state.appointments[appointmentID];
  });

  return stateAppointments;
} //function that returns an array of objects of all the appointments for a certain weekday

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  const interviewz = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

  return interviewz;
} //function that creates a new object that takes in the student and interviewer ID

export function getInterviewersForDay(state, day) {
  const daysObject = state.days.find((dai) => dai.name === day);

  if (!daysObject) {
    return [];
  }

  const daysInterviewers = daysObject.interviewers;

  const stateInterviewers = daysInterviewers.map((interviewerID) => {
    return state.interviewers[interviewerID];
  });

  return stateInterviewers;
} //function that returns an array of objects of all the interviewers for a certain weekday
