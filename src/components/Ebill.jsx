import { Grid,Card,CardContent,Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses }  from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export const Ebill=()=>{
  
  const getData=useSelector((state)=>state.BillDataReducer.alldata)

  const totalAmount = getData.reduce((total, item) => total + item.amt, 0)


    const handlePrint=()=>{
        window.print()
    }

    

   
     
    return(
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card style={{border:"3px solid black"}}>
                    <CardContent>
                        <Grid container spacing={3} >
                            <Grid item xs={12}>
                                <h3 style={{textAlign:"center"}}>TAX INVOICE</h3>
                                <h1 style={{textAlign:"center"}}>NEW MOTOR CARE GARAGE</h1>
                                <p style={{textAlign:"center"}}>Near Shivam Juice Center,Akurdi Railway Station,Pune.411604</p>
                            </Grid>
                            <Grid item xs={6} style={{border:"3px solid black",position:"relative",top:40}}>
                                <h2 style={{position:"relative",bottom:20}}>Party Details :</h2>
                                <span style={{position:"relative",bottom:20,fontWeight:"bold"}}>
                                   Client Name : <span>{getData[0].cname}</span>
                                </span>
                                <br />
                                <span style={{position:"relative",bottom:20,fontWeight:"bold"}}>
                                Client Address : <span>{getData[0].caddress}</span>
                                </span>
                                
                            </Grid>
                            <Grid item xs={6} style={{position:"relative",top:40,left:20,border:"3px solid black",paddingRight:400}}>
                                <span>Invoice No : 22-23</span>
                                <br />
                                <span>Dated : 14-12-2023</span>
                                <br />
                                <span>Place Of Supply : Pune</span>
                                <br />
                                <span>Reverse Charge : N</span>
                                <br />
                            </Grid>
                            <TableContainer style={{position:"relative",top:40,left:10}} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{fontWeight:"bold",fontSize:20,textAlign:"center"}}>Sr No.</StyledTableCell>
            <StyledTableCell style={{fontWeight:"bold",fontSize:20,textAlign:"center"}}>Description</StyledTableCell>
            <StyledTableCell style={{fontWeight:"bold",fontSize:20,textAlign:"center"}} align="right">Quantity</StyledTableCell>
            <StyledTableCell style={{fontWeight:"bold",fontSize:20,textAlign:"center"}} align="right">Price</StyledTableCell>
            <StyledTableCell style={{fontWeight:"bold",fontSize:20,textAlign:"center"}} align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getData.map((item,ind) => (
            <StyledTableRow  key={ind}>
              <StyledTableCell  style={{fontWeight:"bold",fontSize:20}} align="center" component="th" scope="row">
                {ind+1}
              </StyledTableCell>
              <StyledTableCell  style={{fontWeight:"bold",fontSize:20}} align="center" component="th" scope="row">
                {item.desc}
              </StyledTableCell>
              <StyledTableCell style={{fontWeight:"bold",fontSize:20}} align="center">{item.qty}</StyledTableCell>
              <StyledTableCell style={{fontWeight:"bold",fontSize:20}} align="center">₹.{item.price}</StyledTableCell>
              <StyledTableCell style={{fontWeight:"bold",fontSize:20}} align="center">₹.{item.amt}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   <Grid item xs={12}></Grid>
   <Grid item xs={12}></Grid>
   <Grid item xs={12}></Grid>
   <Grid item xs={10}></Grid>
   <Grid item xs={2}>
    <h1>Rs. {totalAmount}</h1>
   </Grid>
    <Grid item xs={4}></Grid>
    <Grid item xs={4} >
        <Button variant="contained" fullWidth onClick={handlePrint}>Print</Button>
    </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}