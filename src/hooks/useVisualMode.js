import React, { useState } from "react";

export default function useVisualMode(initial) {
  // console.log('initial :', initial);

  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // replace = false mean optional
    // setMode(newMode) //change the internal hook state
    // setHistory([...history, newMode]) //adds newMode into the history array

    setHistory((prev) =>
      replace
        ? [...prev.slice(0, history.length - 1), newMode]
        : [...prev, newMode]
    ); //gets rid of last element in array then runs line 15
  };

  const back = () => {
    if (history.length === 1) {
      return history;
    }
    setHistory((prev) => prev.slice(0, history.length - 1)); //removes the last thing on the array USE PREV
  };
  return { transition, mode: history[history.length - 1], back };
}

// prev
