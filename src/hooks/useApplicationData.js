import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // state object that holds data from API
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  //function that books an appointment and takes in an appointment ID and interview object
  function bookInterview(id, interview) {
    const appointment = {
      //makes shallow copy of appointments array
      ...state.appointments[id],
      interview: { ...interview },
    }; //does the same as line 14 but sets the ID object with updated data
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotSpotter(state.days, appointments);

    return axios //makes PUT request to update the state
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }
  //function that cancels an appointment and takes in an appointment ID and interview object
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotSpotter(state.days, appointments);
    //makes DELETE request that updates the state
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }
  //setDay is a function that updates the day state
  const setDay = (day) => setState({ ...state, day });
  //gets the data from the API once the page renders by using useEffect
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  //returns the number of spots in a day
  function spotSpotter(days, appointments) {
    const daysArray = days.map((day) => {
      //pinpoints the day object

      let counter = 0;

      const appointmentsArray = day.appointments;

      for (const number of appointmentsArray) {
        if (!appointments[number].interview) {
          counter++;
        }
      }
      return { ...day, spots: counter }; //array of days holds this object for each day
    });
    return daysArray;
  }

  return { state, setDay, bookInterview, cancelInterview };
}
