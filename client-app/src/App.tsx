import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ButtonAppBar from './Components/NavBar';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7156/api/user')
    .then(response => {
      setUsers(response.data);
    })
  },[])

  return (
    <div className="App">
      <ButtonAppBar/>
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
        {users.map((user : any) => (
            <li key={user.id}>
              {user.firstName}
            </li>
        ))}
        </ul>
    </div>
  );
}

export default App;
