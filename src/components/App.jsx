import React from 'react';
import PropTypes from 'prop-types';
import Form from './SectionForm/Form';
import SectionForm from './SectionForm/SectionForm';
import SectionContacts from './SectionContacts/SectionContacts';
import ContactList from './SectionContacts/ContactsList';
import Filter from './SectionContacts/Filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };
  formSubmitHandler = data => {
    console.log(data);
    const { contacts } = this.state;
    const { id, name, number } = data;

    contacts.find(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : this.setState({
          contacts: [...contacts, { id: id, name: name, number: number }],
        });
  };

  deleteContact = toDeleteId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== toDeleteId),
    }));
  };

  filterForContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filteredContacts();
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
          <Form onSubmit={this.formSubmitHandler} />
        </SectionForm>
        <SectionContacts title="Contacts">
          <Filter value={filter} onChange={this.filterForContacts} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </SectionContacts>
      </div>
    );
  }
}

export default App;

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};
