import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";

import Card from "./Card";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ad`);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div style={{ height: "600px", overflow: "auto" }}>
      <h1>List of Items</h1>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
            <Card item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ItemList;
