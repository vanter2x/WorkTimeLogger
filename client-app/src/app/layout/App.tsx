import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Paperbase from './Paperbase';


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7156/api/user')
      .then(response => {
        setUsers(response.data);
      })
  }, [])

  return (
    <div className="App">
      <Paperbase />


    </div>
  );
}

export default App;
