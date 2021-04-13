import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg'

import './styles.css';

export default function New ({ history }) {
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  const preview = useMemo(() => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]
  )

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }} 
        className={thumbnail ? 'has-thumbnail' : ''}
      >  
        <input type="file" accept="image/*" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select"/>
      </label>

      <label htmlFor="company">Company Name *</label>
      <input 
        id="company"
        placeholder="Your awesome company"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="company">Techs * <span>(separated by comma)</span></label>
      <input 
        id="techs"
        placeholder="What techs do you use?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">Daily price * <span>(don't fill if it's Free!)</span></label>
      <input 
        id="price"
        placeholder="Daily price ($)"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />

      <button className="btn">Submit</button>
    </form>
  )
}