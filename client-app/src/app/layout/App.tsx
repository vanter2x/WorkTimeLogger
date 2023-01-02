import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Paperbase from './Paperbase';
import { User } from '../models/user';


function App() {


  return (
    <div className="App">
      <Paperbase />
    </div>
  );
}

export default App;