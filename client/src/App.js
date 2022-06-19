import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(
        "https://bank-api-benjamin.herokuapp.com/users"
      );
      setUsers(data);
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      {users.map((user) => {
        return <p key={user.passportId}>{user.name}</p>;
      })}
    </div>
  );
}

export default App;
