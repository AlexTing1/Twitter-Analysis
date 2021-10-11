import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import css from './css/start.css';

function Start({ setId }) {
  //const [id, setId] = useState('1232319080637616128');
  const [user, setUser] = useState('certik_io');
  function onChange(event) {
    console.log(event.target.value);
    setUser(event.target.value);
  }

  function setUserName() {
    console.log(user);
    axios.get(`/user/${user}`)
      .then((resp) => {
        console.log(resp.data);
        setId(resp.data.data[0].id);
      })
      .catch(() => alert('Invalid username'));
  }

  return (

    <div className={css.container}>
      <div className={css.title}>
        <h1 className={css.titleText}>Welcome to Twitter Sentiment Analysis</h1>
      </div>
      <div>
        <input type="text" onChange={onChange} />
        <button type="submit" onClick={setUserName} className={css.setButton}>Set Username</button>
      </div>
      <Link to="/twitteranalysis">
        <button type="button" className={css.startButton}>Start</button>
      </Link>
    </div>
  );
}

export default Start;
