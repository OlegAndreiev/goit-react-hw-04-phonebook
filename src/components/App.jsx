import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from './SectionForm/Form';
import SectionForm from './SectionForm/SectionForm';
import SectionContacts from './SectionContacts/SectionContacts';
import ContactList from './SectionContacts/ContactsList';
import Filter from './SectionContacts/Filter';

export default function App() {
  const localContacts = localStorage.getItem('contacts');
  const parsedContacts = JSON.parse(localContacts);
  const [contacts, setContacts] = useState(() => []);
  const [filter, setFilter] = useState(() => '');

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

  useEffect(() => {
    if (contacts.length === 0) {
      console.log('ok');
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    // const localContacts = localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(localContacts);
    // console.log(parsedContacts);
    // localContacts;
    // contacts === [] &&
    //   setContacts(JSON.parse(localStorage.getItem('contacts')));
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

// class App extends React.Component {
//   state = {
//     contacts: [],
//     filter: ,
//   };
//   formSubmitHandler = data => {
//     console.log(data);
//     const { contacts } = this.state;
//     const { id, name, number } = data;

//     contacts.find(contact => contact.name === name)
//       ? alert(`${name} is already in contacts`)
//       : this.setState({
//           contacts: [...contacts, { id: id, name: name, number: number }],
//         });
//   };

//   deleteContact = toDeleteId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== toDeleteId),
//     }));
//   };

//   filterForContacts = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   filteredContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.filteredContacts();
//     return (
//       <div
//         style={{
//           width: 400,
//           padding: 20,
//           marginLeft: 'auto',
//           marginRight: 'auto',
//           borderRadius: 10,
//           backgroundColor: 'white',
//         }}
//       >
//         <SectionForm title="Phonebook">
//           <Form onSubmit={this.formSubmitHandler} />
//         </SectionForm>
//         <SectionContacts title="Contacts">
//           <Filter value={filter} onChange={this.filterForContacts} />
//           <ContactList
//             contacts={filteredContacts}
//             onDeleteContact={this.deleteContact}
//           />
//         </SectionContacts>
//       </div>
//     );
//   }
// }

// export default App;

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
