import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = spotSpotter(state.days, appointments);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments,
          days,
        });
      });
  }
  // check why .catch(e => console.log("error", e)) doesnt work here
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

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  const setDay = (day) => setState({ ...state, day }); //how does day change <---
  // THIS THIS THIS THIS WHEN DOES A PAGE RE RENDER

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
