import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';

const Contacts = _ => {
  const { contacts, filtered, loading, getContacts } = useContext(
    ContactContext
  );

  useEffect(_ => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts === null || loading) {
    return <Spinner />;
  }

  if (contacts !== null && contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <TransitionGroup>
      {(filtered !== null ? filtered : contacts).map(contact => (
        <CSSTransition key={contact._id} timeout={400} classNames='item'>
          <ContactItem contact={contact} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Contacts;
