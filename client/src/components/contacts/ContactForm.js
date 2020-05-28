import React, { useContext, useState, useEffect } from 'react';
import ContactContext from '../../context/contacts/contactContext';

const defaultState = {
  name: '',
  email: '',
  phone: '',
  type: 'personal'
};

const ContactForm = _ => {
  const { current, addContact, updateContact, clearCurrent } = useContext(
    ContactContext
  );

  const [contact, setContact] = useState(defaultState);

  useEffect(
    _ => {
      if (current !== null) {
        setContact(current);
      } else {
        setContact(defaultState);
      }
    },
    [current]
  );

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (current) {
      await updateContact(contact);
    } else {
      await addContact(contact);
    }
    setContact(defaultState);
  };

  const clearAll = e => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
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
          value={current ? 'Update Contact' : 'Add Contact'}
          className='
        btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
