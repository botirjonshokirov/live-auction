import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";

const ExportData = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [items, setItems] = useState([]);
  const [owners, setOwners] = useState({});
  const [purchasers, setPurchasers] = useState({});

  useEffect(() => {
    const fetchPurchasers = async () => {
      const purchaserIds = items
        .filter((item) => item.sold)
        .map((item) => item.purchasedBy);
      const uniquePurchaserIds = [...new Set(purchaserIds)]; // Get unique purchaser ids
      const purchaserRequests = uniquePurchaserIds.map((purchaserId) =>
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/${purchaserId}`)
      );
      try {
        const purchaserResponses = await Promise.all(purchaserRequests);
        const purchasersData = purchaserResponses.reduce((acc, response) => {
          const purchaser = response.data;
          if (!(purchaser._id in acc)) {
            acc[purchaser._id] = purchaser.username;
          }
          return acc;
        }, {});
        setPurchasers(purchasersData);
      } catch (error) {
        console.log("Error fetching purchasers:", error);
      }
    };
    if (items.length > 0) {
      fetchPurchasers();
    }
  }, [items]);

  useEffect(() => {
    const fetchItems = async () => {
      setIsFetching(true);
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/ad`);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
      setIsFetching(false);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchOwners = async () => {
      const ownerIds = items.map((item) => item.owner);
      const uniqueOwnerIds = [...new Set(ownerIds)]; // Get unique owner ids
      const ownerRequests = uniqueOwnerIds.map((ownerId) =>
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/${ownerId}`)
      );
      try {
        const ownerResponses = await Promise.all(ownerRequests);
        const ownersData = ownerResponses.reduce((acc, response) => {
          const owner = response.data;
          if (!(owner._id in acc)) {
            acc[owner._id] = owner.username;
          }
          return acc;
        }, {});
        setOwners(ownersData);
      } catch (error) {
        console.log("Error fetching owners:", error);
      }
    };
    if (items.length > 0) {
      fetchOwners();
    }
  }, [items]);

  const exportToCSV = () => {
    let data = items.map((item) => ({
      "Product Name": item.productName,
      "Base Price": item.basePrice.$numberDecimal,
      "Current Price": item.currentPrice.$numberDecimal,
      Sold: item.sold ? "Yes" : "No",
      Owner: owners[item.owner],
      "Purchased By": item.sold ? purchasers[item.purchasedBy] : "No purchaser",
      "No. of Bids": item.bids.length,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "ExportData.xlsx");
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        onClick={exportToCSV}
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
      >
        Export to Excel
      </Button>
      <div style={{ maxHeight: "700px", overflow: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#f2f2f2", color: "#333333" }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#f2f2f2", color: "#333333" }}
                >
                  Base Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#f2f2f2", color: "#333333" }}
                >
                  Current Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#f2f2f2", color: "#333333" }}
                >
                  Sold
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#f2f2f2", color: "#333333" }}
                >
                  Owner
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#f2f2f2", color: "#333333" }}
                >
                  Purchased By
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ backgroundColor: "#f2f2f2", color: "#333333" }}
                >
                  No. of Bids
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.productName}
                  </TableCell>
                  <TableCell align="right">
                    {item.basePrice.$numberDecimal}
                  </TableCell>
                  <TableCell align="right">
                    {item.currentPrice.$numberDecimal}
                  </TableCell>
                  <TableCell align="right">
                    {item.sold ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">{owners[item.owner]}</TableCell>
                  <TableCell align="right">
                    {item.sold ? purchasers[item.purchasedBy] : "No purchaser"}
                  </TableCell>
                  <TableCell align="right">{item.bids.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ExportData;
