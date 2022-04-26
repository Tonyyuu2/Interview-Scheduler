import React, { Fragment } from 'react'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Status from './Status'
import Form from './Form'
import Confirm from './Confirm'
import Error from './Error'
import useVisualMode from "hooks/useVisualMode"

import 'components/Appointment/styles.scss'
// mode constants
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) { //useVisualCode initializes with the strings 

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY //how does SHOW AND EMPTY HAPPEN 
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch((e) => {
      transition(ERROR_SAVE, true)
    }
  )}

  function deelete() {
    transition(DELETING)
    props.cancelInterview(props.id).then(() => transition(EMPTY)).catch((e) => 
      transition(ERROR_DELETE, true))
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        
        {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)}/>}
        
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
        {mode === CONFIRM && <Confirm onConfirm={deelete} onCancel={back}/>}
        {mode === SAVING && <Status message="Saving"/>}
        {mode === DELETING && <Status message="Deleting"/>}
        {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer} interviewers={props.interviewers} onSave={save} onCancel={back}/>}
        {mode === ERROR_DELETE && <Error message="Could not delete" onClose={back}/>}
        {mode === ERROR_SAVE && <Error message="Could not save" onClose={back}/>}
      </article>
    </Fragment>
  )
}
