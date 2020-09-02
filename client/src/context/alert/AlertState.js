import React, { useReducer } from 'react';
import alertContext from '../alert/alertContext';
import alertReducer from '../alert/alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
  const initialstate = [];

  const [state, dispatch] = useReducer(alertReducer, initialstate);

  const setalert = (type, msg, timeout = 3000) => {
    const id = 1;
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

  return (
    <alertContext.Provider
      value={{
        alerts: state,
        setalert,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
