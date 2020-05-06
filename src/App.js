import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Dashboard from './components/Dashboard'
import FormUsers from './components/FormUser';
function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [addEdit, setAddEdit] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(response => setAllUsers(response))
  }, [])


  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Dashboard allUsers={allUsers} setAllUsers={setAllUsers} addEdit={addEdit} setAddEdit={setAddEdit}
            name={name} setName={setName} email={email} setEmail={setEmail} setId={setId} id={id} />
        </Route>
        <Route path="/formUser">
          <FormUsers allUsers={allUsers} setAllUsers={setAllUsers} addEdit={addEdit} setAddEdit={setAddEdit}
            name={name} setName={setName} email={email} setEmail={setEmail} id={id} />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;