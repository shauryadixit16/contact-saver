import React from 'react';
import alertContext from '../../context/alert/alertContext';
import { useContext } from 'react';
const Alert = () => {
  const alertcontext = useContext(alertContext);

  return (
    alertcontext.alerts.length > 0 &&
    alertcontext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle'></i>
        {alert.msg}
      </div>
    ))
  );
};
export default Alert;
