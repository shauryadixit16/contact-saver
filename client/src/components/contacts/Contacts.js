import React, { useContext, Fragment, useEffect } from 'react';
import contactContext from '../../context/contact/contactContext';
import Contactitem from './Contactitem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const Contacts = () => {
  const contactcontext = useContext(contactContext);
  const { contacts, filtered, loading, getContacts } = contactcontext;
  useEffect(() => {
    getContacts();
  }, []);
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please Add your contacts</h4>;
  }
  return !loading ? (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} classNames='item' timeout={500}>
                <Contactitem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact._id} classNames='item' timeout={500}>
                <Contactitem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  ) : (
    <div>Spinner</div>
  );
};
export default Contacts;
