import React from 'react'

export function getAppointmentsForDay(state, day) {

  const daysObject = state.days.find(dai => dai.name === day)
  console.log('daysObject :', daysObject);

  if (!daysObject) {
    return []
  }

  const daysAppointment = daysObject.appointments
  console.log('daysAppointment :', daysAppointment);

  const stateAppointments = daysAppointment.map((appointmentID) => {

    return  state.appointments[appointmentID]
  })

  console.log('stateAppointments :', stateAppointments);
  return stateAppointments
}



  
