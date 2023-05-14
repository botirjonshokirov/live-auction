import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, ListItem, ListItemText } from "@mui/material";

import Card from "./Card";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/user`
        );
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>List of Users</h1>
      <List sx={{ overflow: "auto", maxHeight: 600 }}>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText>
              <Card user={user} />
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserList;
