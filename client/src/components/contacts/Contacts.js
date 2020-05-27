import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';

const Contacts = _ => {
  const { contacts, filtered } = useContext(ContactContext);

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <TransitionGroup>
      {(filtered !== null ? filtered : contacts).map(contact => (
        <CSSTransition key={contact.id} timeout={400} classNames='item'>
          <ContactItem contact={contact} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Contacts;
