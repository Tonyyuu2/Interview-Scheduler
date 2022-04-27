import React from "react";

export function getAppointmentsForDay(state, day) {
  const daysObject = state.days.find((dai) => dai.name === day);
  // console.log('daysObject :', daysObject);

  if (!daysObject) {
    return [];
  }

  const daysAppointment = daysObject.appointments;
  // console.log('daysAppointment :', daysAppointment);

  const stateAppointments = daysAppointment.map((appointmentID) => {
    return state.appointments[appointmentID];
  });

  // console.log('stateAppointments :', stateAppointments);
  return stateAppointments;
}

export function getInterview(state, interview) {
  // console.log('state----- :', state);
  // console.log('interview :', interview);

  // const example = {...interview, interviewer: state.interviewers}
  // console.log('example :', example);

  if (interview === null) {
    return null;
  }

  const interviewz = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  // console.log('interviewz :', interviewz);

  return interviewz;
}

export function getInterviewersForDay(state, day) {
  const daysObject = state.days.find((dai) => dai.name === day);

  // console.log('daysObject :', daysObject);

  if (!daysObject) {
    return [];
  }

  const daysInterviewers = daysObject.interviewers;
  // console.log('daysAppointment :', daysAppointment);

  const stateInterviewers = daysInterviewers.map((interviewerID) => {
    return state.interviewers[interviewerID];
  });

  // console.log('stateAppointments :', stateAppointments);
  return stateInterviewers;
}



