import React from 'react';
import PropTypes from 'prop-types';
import css from './SectionContacts.module.css';

const Filter = ({ value, onChange }) => (
  <label className={css.filterLabel}>
    Find contacts by name
    <input
      className={css.labelInput}
      type="text"
      value={value}
      onChange={onChange}
    ></input>
  </label>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
