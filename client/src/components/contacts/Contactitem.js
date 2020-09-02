import React, { useContext } from 'react';
import contactContext from '../../context/contact/contactContext';
const Contactitem = ({ contact }) => {
  const contactcontext = useContext(contactContext);

  const { id, name, type, phone, email } = contact;
  const onclick = () => {
    contactcontext.deleteContact(id);
    contactcontext.Clearcurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i>
            {phone}
          </li>
        )}
      </ul>
      <p
        className='btn btn-dark brn-sm'
        onClick={() => contactcontext.Setcurrent(contact)}
      >
        Edit
      </p>
      <p className='btn btn-danger brn-sm' onClick={onclick}>
        Delete
      </p>
    </div>
  );
};
export default Contactitem;
