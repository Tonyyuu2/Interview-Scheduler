import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";

function InterviewerList(props) {
  //takes in interviewers array and loops through to pull interviewer object
  const interviewerList = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    ); //populates InterviewerListItem with props from interviewer object
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
