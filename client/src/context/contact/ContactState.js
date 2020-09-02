import React, { useReducer } from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import { v4 as uuid } from 'uuid';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
} from '../types';

const ContactState = (props) => {
  const initialstate = {
    contacts: [
      {
        id: '1',
        name: 'MSD',
        email: 'msd@msd.com',
        phone: '11111-11111',
        type: 'personal',
      },
      {
        id: '2',
        name: 'SD',
        email: 'sd@msd.com',
        phone: '00011-11111',
        type: 'personal',
      },
      {
        id: '3',
        name: 'MD',
        email: 'md@msd.com',
        phone: '22411-11111',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialstate);

  // add contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };
  // update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // set current contact
  const Setcurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // filter contacts
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  // clear current contact
  const Clearcurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        Setcurrent,
        Clearcurrent,
        updateContact,
        filterContact,
        clearFilter,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
