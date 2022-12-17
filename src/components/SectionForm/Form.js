import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './SectionForm.module.css';

export default function Form({ onSubmit }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // const [contacts, setContacts] = useState([]);

  const handleInputChangeName = event => {
    const { value } = event.currentTarget;
    setId(nanoid());
    setName(value);
  };

  const handleInputChangeNumber = event => {
    const { value } = event.currentTarget;
    setNumber(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ id, name, number });
    reset();
  };

  const reset = () => {
    setId('');
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div>
        <label className={css.formLabel}>
          Name
          <input
            type="text"
            name="name"
            value={name}
            className={css.labelInput}
            onChange={handleInputChangeName}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.formLabel}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            className={css.labelInput}
            onChange={handleInputChangeNumber}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <button className={css.formButton} type="submit">
        Add contact
      </button>
    </form>
  );
}

// class Form extends React.Component {
//   state = {
//     id: '',
//     name: '',
//     number: '',
//   };

//   handleInputChangeName = event => {
//     this.setState({ id: nanoid() });
//     this.setState({ name: event.currentTarget.value });
//   };

//   handleInputChangeNumber = event => {
//     this.setState({ number: event.currentTarget.value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ contacts: [], name: '', id: '', number: '' });
//   };

//   render() {
//     const { name, number } = this.state;
//     return (
// <form className={css.form} onSubmit={this.handleSubmit}>
//   <div>
//     <label className={css.formLabel}>
//       Name
//       <input
//         type="text"
//         name="name"
//         value={name}
//         className={css.labelInput}
//         onChange={this.handleInputChangeName}
//         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//         required
//       />
//     </label>
//     <label className={css.formLabel}>
//       Number
//       <input
//         type="tel"
//         name="number"
//         value={number}
//         className={css.labelInput}
//         onChange={this.handleInputChangeNumber}
//         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//         required
//       />
//     </label>
//   </div>
//   <button className={css.formButton} type="submit">
//     Add contact
//   </button>
// </form>
//     );
//   }
// }
// export default Form;

// Form.propTypes = {
//   onSubmit: PropTypes.func.isRequired,
// };
