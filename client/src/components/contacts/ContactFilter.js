import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const ContactFilter = _ => {
  const { filtered, filterContacts, clearFilter } = useContext(ContactContext);
  const text = useRef('');

  useEffect(
    _ => {
      if (filtered === null) {
        text.current.value = '';
      }
    },
    [filtered]
  );

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
