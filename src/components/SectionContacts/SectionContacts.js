import React from 'react';
import PropTypes from 'prop-types';
import css from './SectionContacts.module.css';

const SectionContacts = ({ title, children }) => (
  <section className={css.section}>
    <h2>{title}</h2>
    {children}
  </section>
);

export default SectionContacts;

SectionContacts.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};
