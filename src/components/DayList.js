import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  //takes in the days array and gets day object to pass props to DayListItem
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayList}</ul>;
}

export default DayList;
