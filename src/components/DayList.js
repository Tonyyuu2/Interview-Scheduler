import React from 'react'
import DayListItem from './DayListItem';

function DayList(props) {
  
  const dayList = props.days.map((day) => {
    return (
      <ul key={day.id}>
        <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.name}
        setDay={props.setDay}
        />
      </ul>
    )
  })
  
  return (
    <ul>
      {dayList}
    </ul>
  )
}

export default DayList