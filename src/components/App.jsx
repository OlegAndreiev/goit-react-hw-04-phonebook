import React, { useEffect, useState } from 'react';
import Form from './SectionForm/Form';
import SectionForm from './SectionForm/SectionForm';
import SectionContacts from './SectionContacts/SectionContacts';
import ContactList from './SectionContacts/ContactsList';
import Filter from './SectionContacts/Filter';

export default function App() {
  // const localContacts = localStorage.getItem('contacts');
  // const parsedContacts = JSON.parse(localContacts);
  const [contacts, setContacts] = useState(() =>JSON.parse(localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState(() => '');
console.log(contacts);
  const formSubmitHandler = data => {
    const { id, name, number } = data;

    contacts.find(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevContacts => [
          ...prevContacts,
          {
            id: id,
            name: name,
            number: number,
          },
        ]);
  };

  const filterForContacts = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = toDeleteId => {
    setContacts(contacts.filter(contact => contact.id !== toDeleteId));
  };

  // const localContactsCheck = () => {
  //   if (parsedContacts !== null) {
  //     setContacts(parsedContacts);
  //   }
  // };

  // useEffect(() => {
  //   localContactsCheck();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        width: 400,
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        backgroundColor: 'white',
      }}
    >
      <SectionForm title="Phonebook">
        <Form onSubmit={formSubmitHandler} />
      </SectionForm>
      <SectionContacts title="Contacts">
        <Filter value={filter} onChange={filterForContacts} />
        <ContactList
          contacts={filteredContacts()}
          onDeleteContact={deleteContact}
        />
      </SectionContacts>
    </div>
  );
}
