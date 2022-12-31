import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Paperbase from './Paperbase';
import { User } from '../models/user';


function App() {
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    axios.get<User[]>('https://localhost:7156/api/user')
      .then((response) => {
        setUsers(response.data);
      })
    console.log(users);
  }, [])

  return (
    <div className="App">
      <Paperbase users={users} />


    </div>
  );
}

export default App;
