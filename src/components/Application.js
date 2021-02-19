import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import getAppointmentsForDay from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day});
  // const setDays = days => setState(prev => ({ ...prev, days}));

  useEffect(() => {
    const promiseDays = axios.get("/api/days");
    const promiseAppointments = axios.get("/api/appointments");

    Promise.all([promiseDays, promiseAppointments])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data }))
      })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          day={state.day} 
          setDay={setDay} 
        />
      </nav>
      
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(a => <Appointment key={a.id} {...a} />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}