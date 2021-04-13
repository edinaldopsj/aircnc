import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import './styles.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/sessions', { email });

    const { _id } = response.data;

    localStorage.setItem('user', _id);
    history.push('/dashboard');
  }

  return (
    <>
      <p>
        Offer <strong>spots</strong>. Find new <strong>talents</strong>!
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          placeholder="Your best email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          type="email"
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func,
  }),
};

Login.defaultProps = {
  history: {},
};
