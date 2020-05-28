import React, { useReducer } from 'react';
//import { v4 as uuid } from 'uuid';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_ERROR
} from '../types';

const initialState = {
  // contacts: [
  //   {
  //     _id: 1,
  //     type: 'professional',
  //     name: 'Sara Smith',
  //     email: 'ssmith@gmail.com',
  //     phone: '444-444-4444'
  //   },
  //   {
  //     _id: 2,
  //     type: 'personal',
  //     name: 'Ted Johnson',
  //     email: 'ted@gmail.com',
  //     phone: '222-222-2222'
  //   },
  //   {
  //     _id: 3,
  //     type: 'personal',
  //     name: 'Melissa Williams',
  //     email: 'missy@gmail.com',
  //     phone: '333-333-3334'
  //   }
  // ],
  contacts: null,
  current: null,
  filtered: null,
  error: null
};

const ContactState = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async _ => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Add Contact
  const addContact = async contact => {
    //contact._id = uuid();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Update Contact
  const updateContact = async contact => {
    //contact._id = uuid();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      console.log(contact);
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Clear Contacts
  const clearContacts = _ => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set Current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = _ => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilter = text => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactState;
