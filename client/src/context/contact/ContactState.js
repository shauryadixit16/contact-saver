import React, { useReducer } from 'react';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_CURRENT,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';
import { response } from 'express';

const ContactState = (props) => {
  const initialstate = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialstate);

  // get all contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contact');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  // clear contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };
  // add contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contact', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  // delete contact
  const deleteContact = async (id) => {
    try {
      const res = await axios.delete(`/api/contact/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  // update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contact/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
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
        error: state.error,
        addContact,
        deleteContact,
        Setcurrent,
        Clearcurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
