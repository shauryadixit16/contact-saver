import React, { useRef, useContext, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const contactcontext = useContext(contactContext);
  const { filtered, filterContact, clearFilter, contacts } = contactcontext;
  const text = useRef('');
  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  onchange = (e) => {
    if (text.current.value !== '') {
      filterContact(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter Contacts....'
        onChange={onchange}
        disabled={contacts.length === 0 ? true : false}
      />
    </form>
  );
};
export default ContactFilter;
