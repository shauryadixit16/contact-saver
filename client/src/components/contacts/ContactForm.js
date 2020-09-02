import React, { useContext, useState, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';
const ContactForm = () => {
  const contactcontext = useContext(contactContext);
  const { addContact, current, Clearcurrent, updateContact } = contactcontext;

  const [contact, Setcontact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  useEffect(() => {
    if (current !== null) {
      Setcontact(current);
    } else {
      Setcontact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) => {
    Setcontact({ ...contact, [e.target.name]: e.target.value });
  };
  const clearAll = () => {
    Clearcurrent();
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addContact(contact);
    } else {
      updateContact(contact);
      clearAll();
    }
    Setcontact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };
  return (
    <form onSubmit={onsubmit}>
      <h2 className='text-primary'>
        {current === null ? 'Add Contact' : 'Update Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          className='btn btn-primary btn-block'
          value={current === null ? 'Add Contact' : 'Update Contact'}
        />
      </div>
      {current && (
        <button className='btn btn-light btn-block' onClick={clearAll}>
          Clear All
        </button>
      )}
    </form>
  );
};

export default ContactForm;
