import React, { useContext, Fragment } from 'react';
import contactContext from '../../context/contact/contactContext';
import Contactitem from './Contactitem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const Contacts = () => {
  const contactcontext = useContext(contactContext);
  const { contacts, filtered } = contactcontext;
  if (contacts.length === 0) {
    return <h4>Please Add your contacts</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((contact) => (
              <CSSTransition key={contact.id} classNames='item' timeout={500}>
                <Contactitem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact.id} classNames='item' timeout={500}>
                <Contactitem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};
export default Contacts;
