import React from 'react';
import PropTypes from 'prop-types';
import css from './SectionForm.module.css';

const SectionForm = ({ title, children }) => (
  <section className={css.section}>
    <h2>{title}</h2>
    {children}
  </section>
);

export default SectionForm;

SectionForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
