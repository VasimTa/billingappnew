import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const BillingDesign = () => {
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [amt, setAmt] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [msg, setMsg] = useState("");
  const [index, setIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [carNames] = useState(["Maruti Suzuki", "Hyundai", "TATA MOTORS"]);
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [updatemsg,setUpdateMsg]=useState("")
  const [cname,setCname]=useState("")
  const [caddress,setCaddress]=useState("")

  const carBrandModelMapping = {
    MarutiSuzuki: {
      Alto: ["800 STD Opt", "800 LXI Opt", "800 VXI Plus"],
      Baleno: ["Alpha", "Zeta", "Delta","Sigma"],
      SwiftDzire: ["Maruti Swift Dzire VXI", "Maruti Swift Dzire VXI AT", "Maruti Swift Dzire ZXI"],
    },
    Hyundai: {
      Aura: ["S CNG", "SX Option", " SX Plus AMT"],
      Creta: ["SX Adventure Edition", "E Diesel", "S Plus Knight"],
      Santro: ["Santro GLS I Euro I", "Santro GLS I Euro II", "Santro L2"],
      Venue: ["Venue E", "Venue S Opt Knight", "Venue S Opt Turbo"],
    },
    TATAMOTORS: {
      Altroz: ["Altroz XE", "Altroz XM", "Altroz XM Plus"],
      Harrier: ["Harrier Smart", "Harrier Pure", "Harrier Pure Plus"],
      Safari: ["Safari Smart", "Safari Pure", "Safari Pure Plus"],
      Nexon: ["Nexon Smart", "Nexon Pure", "Nexon Smart Plus"],
    },
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setAmt(qty * price);
  }, [qty, price]);

  const handleDetails = () => {
    if (edit === true) {
      data.splice(index, 1, { desc, qty, price, amt });
      setUpdateMsg("Item Updated Successfully...");
      setTimeout(() => {
        updatemsg("");
      }, 3000);
      setIndex(null);
      setEdit(false);
      setShow(false);
      setDesc("");
      setQty("");
      setPrice("");
      setCname("")
      setCaddress("")
    
    } else { 
     if(desc && qty && price && cname && caddress !==""){
      setDesc("");
      setQty("");
      setPrice("");
      setCname("")
      setCaddress("")
      setAmt(0);
      setData([...data, { desc, qty, price, amt,cname,caddress }]);
      setTotal(total + amt);
     }else{
      alert("Please Type Your Item Details")
     }
       
     
     
    }
  };

  const handleDelete = (ind, item) => {
    const deletedItem = data[ind];
    const deletedAmount = deletedItem.amt;

    const result = data.filter((elem, i) => i !== ind);
    setData(result);

    setMsg(`${item.desc} Deleted Successfully...`);

    setTotal((prevTotal) => prevTotal - deletedAmount);

    setTimeout(() => {
      setMsg("");
    }, 3000);
  };

  const handleUpdate = (item, ind) => {
    setDesc(item.desc);
    setQty(item.qty);
    setPrice(item.price);
    setIndex(ind);
    setEdit(true);
    setShow(true);
  };

  const handleBill = () => {
    if(data.length>0){
      const type = "ADD-DATA";
      const payload = [...data];
      const action = { type, payload };
      dispatch(action);
      navigate("/ebill");
    }else{
      alert("You Don't Have Any List For Billing")
    }
    
  };

  const handleCarChange = (event) => {
    const selectedCarName = event.target.value;
    setSelectedCar(selectedCarName);

    setSelectedBrand("");
    setSelectedModel("");
  };

  const handleBrandChange = (event) => {
    const selectedBrandName = event.target.value;
    setSelectedBrand(selectedBrandName);

    setSelectedModel("");
  };

  const handleModelChange = (event) => {
    const selectedModelValue = event.target.value;
    setSelectedModel(selectedModelValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} >
        <Card style={{ border: "5px solid black" }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <img
                  height={200}
                  style={{ position: "relative", left: 450 }}
                  src="https://media.istockphoto.com/id/1157655660/photo/generic-red-suv-on-a-white-background-side-view.jpg?s=612x612&w=0&k=20&c=ecrvXZhimUHnYES-kx7L5b-TDtRU5kAFPpNm0ZtAp1Y="
                  alt=""
                />
                <h1 style={{ textAlign: "center" }}>New Motor Care</h1>
              </Grid>

              <Grid item xs={4}>
                <h3>Enter Your Clients Name</h3>
                <TextField
                onChange={(e)=>setCname(e.target.value)}
                value={cname}
                  variant="outlined"
                  fullWidth
                  label="Enter Your Clients Name"
                />
              </Grid>
              <Grid item xs={4}>
                <h3>Enter Your Clients Address</h3>
                <TextField
                onChange={(e)=>setCaddress(e.target.value)}
                value={caddress}
                  variant="outlined"
                  fullWidth
                  label="Enter Your Clients Address"
                />
              </Grid>
              <Grid item xs={4}>
                <h4>Invoice Number</h4>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Invoice Number"
                />
              </Grid>
              <Grid item xs={3}>
                <h4>Invoice Date</h4>
                <TextField variant="outlined" fullWidth label="Invoice Date" />
              </Grid>
              <Grid item xs={3}>
                <h4>Due Date</h4>
                <TextField variant="outlined" fullWidth label="Vehicle No." />
              </Grid>
              <Grid item xs={3}>
                <h4>Vehicle No.</h4>
                <TextField variant="outlined" fullWidth label="Vehicle No." />
              </Grid>
              <Grid item xs={3}>
                <h4>Kilometer</h4>
                <TextField variant="outlined" fullWidth label="Kilometer" />
              </Grid>
           
              <Grid item xs={6}>
                <h4>Client Mobile No.</h4>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Client Mobile No."
                />
              </Grid>
              <Grid item xs={6}>
                <h4>Clients Email Address</h4>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Clients Email Address"
                />
              </Grid>

              <Grid item xs={4}>
                <h4>Car Name</h4>
                <TextField
                  select
                  fullWidth
                  value={selectedCar}
                  onChange={handleCarChange}
                  variant="outlined"
                  label="Select Car"
                >
                  {carNames.map((carName) => (
                    <MenuItem key={carName} value={carName}>
                      {carName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <h4>Car Brand</h4>
                <TextField
                  select
                  fullWidth
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  variant="outlined"
                  label="Select Brand"
                >
                  {carBrandModelMapping[selectedCar] ? (
                    Object.keys(carBrandModelMapping[selectedCar]).map(
                      (brand) => (
                        <MenuItem key={brand} value={brand}>
                          {brand}
                        </MenuItem>
                      )
                    )
                  ) : (
                    <MenuItem value="">Select a Car First</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <h4>Car Model</h4>
                <TextField
                  select
                  fullWidth
                  value={selectedModel}
                  onChange={handleModelChange}
                  variant="outlined"
                  label="Select Model"
                >
                  {carBrandModelMapping[selectedCar]?.[selectedBrand] ? (
                    carBrandModelMapping[selectedCar][selectedBrand].map(
                      (model) => (
                        <MenuItem key={model} value={model}>
                          {model}
                        </MenuItem>
                      )
                    )
                  ) : (
                    <MenuItem value="">Select a Brand First</MenuItem>
                  )}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <h4>Item Description</h4>
                <TextField
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  variant="outlined"
                  fullWidth
                  label="Item Description"
                />
              </Grid>
              <Grid item xs={4}>
                <h4>Quantity</h4>
                <TextField
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  variant="outlined"
                  fullWidth
                  label="Quantity"
                />
              </Grid>
              <Grid item xs={4}>
                <h4>Price</h4>
                <TextField
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  variant="outlined"
                  fullWidth
                  label="Price"
                />
              </Grid>
              <Grid item xs={4}>
                <h4>Amount</h4>
                <h4>{amt}</h4>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button
                
                  onClick={handleDetails}
                  style={{ backgroundColor: edit ? "orange" : "green" }}
                  variant="contained"
                  fullWidth
                >
                  {edit ? "Update table Item" : "Add Table Item"}
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                {msg && <Alert severity="error">{msg}</Alert>}
                {updatemsg && <Alert severity="success">{updatemsg}</Alert>}
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3} align="center">
                  <TableContainer
                    style={{ position: "relative", top: 40, left: 10 }}
                    component={Paper}
                  >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              textAlign: "center",
                            }}
                          >
                            Description
                          </StyledTableCell>
                          <StyledTableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              textAlign: "center",
                            }}
                            align="right"
                          >
                            Quantity
                          </StyledTableCell>
                          <StyledTableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              textAlign: "center",
                            }}
                            align="right"
                          >
                            Price
                          </StyledTableCell>
                          <StyledTableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              textAlign: "center",
                            }}
                            align="right"
                          >
                            Amount
                          </StyledTableCell>
                          <StyledTableCell
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              textAlign: "center",
                            }}
                            align="right"
                          >
                            Edit
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item, ind) => (
                          <StyledTableRow key={item.desc}>
                            <StyledTableCell
                              style={{ fontWeight: "bold", fontSize: 20 }}
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {item.desc}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontWeight: "bold", fontSize: 20 }}
                              align="center"
                            >
                              {item.qty}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontWeight: "bold", fontSize: 20 }}
                              align="center"
                            >
                              ₹.{item.price}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontWeight: "bold", fontSize: 20 }}
                              align="center"
                            >
                              ₹.{item.amt}
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ fontWeight: "bold", fontSize: 20 }}
                              align="center"
                            >
                              <DeleteIcon
                                onClick={() => handleDelete(ind, item)}
                                style={{ color: "red", cursor: "pointer" }}
                              />
                              <BorderColorIcon
                                onClick={() => handleUpdate(item, ind)}
                                style={{
                                  color: "blue",
                                  cursor: "pointer",
                                  display: show ? "none" : "",
                                }}
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={handleBill}
                      style={{ position: "relative", top: 60 }}
                    >
                      Print The Bill
                    </Button>
                  </Grid>
                  <Grid item xs={8}></Grid>
                  <Grid item xs={2}>
                    <Card
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        position: "relative",
                        top: 30,
                        height: 100,
                      }}
                    >
                      <CardContent>
                        <h3 style={{ color: { sm: "green" } }}>
                          Rs. {total}/-
                        </h3>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};