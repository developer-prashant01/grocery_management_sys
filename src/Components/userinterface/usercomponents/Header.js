import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Paper,Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomePageDrawer from './HomePageDrawer';
import { useLocation, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Cart from '../screens/Cart';

export default function Header() {

var products=useSelector((state)=>state.cart) //this use selector is use to get the result from the redux container i.e here cart
var totalProducts=Object.keys(products)

//console.log("totalproducts",totalProducts)
var navigate=useNavigate()
/* handle click*/

const handleClick=()=>{

  navigate("/cart")
}

var location =useLocation()  //useLocation() is use to check the current location of the page 
//console.log("Locationprashantsss:",location)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open,setOpen]=React.useState(false)
  const handleOpenDrawer=()=>{

    setOpen(true)
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
      <AppBar position="static" style={{height:47,background:'rgba(93,9,121,1)',display:'flex',alignItems:'left',justifyContent:'center'}}>
        <div style={{margin:10,display:'flex',alignItems:'center'}}>
            {matches?<MenuIcon  onClick={handleOpenDrawer}/>:<></>}
            <div style={{marginLeft:20,display:'flex',alignItems:'center'}}>
             <LocationOnIcon/>
            <span style={{fontFamily:'poppins',fontWeight:'bold',marginLeft:10,letterSpacing:1}}> Gwalior</span></div>

            <div style={{display:'flex',justifyContent:'space-between',fontWeight:'500',fontFamily:'poppins',marginLeft:'auto',width:!matches?250:50,padding:10}}>
                {!matches ?<><span>Offer</span>
                <span>Deals</span>
                <span>Coupons</span>

                <span><Badge badgeContent={totalProducts.length} color="primary">
                <ShoppingCartIcon onClick={handleClick}/>
                </Badge></span>
                <span><PersonIcon/></span></>
                :<>
                <span><ShoppingCartIcon/></span>
                <span><PersonIcon/></span></>}
                
                
            </div>
        </div>
      </AppBar>
    {location.pathname=='/home'?
      <Paper elevation={1} style={{width:'100%' ,height:70,display:'flex'}}>
        <img src='/assets/baba.png'  style={{width:70,marginLeft:50}}></img>
        <div style={{display:'flex',justifyContent:'space-between', width:500,marginLeft:30}}>
        <Button style={{fontFamily:'poppins',fontWeight:'600',color:'rgba(93,9,121,1)'}}>Category</Button>
        <Button  style={{fontFamily:'poppins',fontWeight:'600',color:'rgba(93,9,121,1)'}}>Deals</Button>
        <Button  style={{fontFamily:'poppins',fontWeight:'600',color:'rgba(93,9,121,1)'}}>Whats's New</Button>
        <Button  style={{fontFamily:'poppins',fontWeight:'600',color:'rgba(93,9,121,1)'}}>Treanding</Button>
        
        </div>

      </Paper>:<></>}
      <HomePageDrawer open={open} setOpen={setOpen}/>
   
    </div>
 
  );
}