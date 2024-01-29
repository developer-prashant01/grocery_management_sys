import React,{ useState,useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import CategoryIcon from '@mui/icons-material/Category';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LogoutIcon from '@mui/icons-material/Logout';
import {Routes,Route} from "react-router-dom";
import DisplayAllCategories from "./DisplayAllCategories";
import { Navigate, useNavigate } from "react-router-dom";
import ProductCategory from "./ProductCategory";
import { ServerURL } from "../ServerServices";
import DisplayAllProducts from "./DisplayAllProdycts";
import Products from "./Products";
import ListProduct from "./ListProduct"
import Banners from "./Banners"
export default function Dashboard()
{
  var navigate=useNavigate();
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  //alert(JSON.stringify(admin))
  //console.log("ADMIN",admin)
    return(<div>
      
      <AppBar position="static">
        <Toolbar variant="dense" style={{background:'black'}}>
          <IconButton edge="start" style={{color:'#ff9f1a'}} aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{color:'#ff9f1a',fontFamily:'poppins',letterSpacing:1}}  component="div">
            Baba Traders
          </Typography>
        </Toolbar>
      </AppBar>
   
      <Grid container spacing={1}>
        <Grid item xs={2}>
        <div>
            <img   src={`${ServerURL}/images/${admin.logo}`}  style={{borderRadius:40,width:80,margin:20}} />
            <Paper elevation={1}  style={{background:'#dfe6e9',height:60,width:220,margin:20 ,display:'flex',alignItems:'center' ,justifyContent:'space-between'}}>
            <img src="/assets/admin.jpg"  style={{height:50 ,borderRadius:25,marginLeft:30}} ></img>
            <span style={{fontWeight:500,fontFamily:'poppins',marginRight:50}}>{admin.ownername}</span>
            </Paper>
        </div>
        
        <div style={{width:230,margin:20}}>
            <List component="nav" >
                <ListItemButton 
                onClick={() => navigate("/dashboard/displayallcategories")}
                >
                <ListItemIcon>
                    <CategoryIcon></CategoryIcon>
                </ListItemIcon>
                <ListItemText primary={<span style={{fontFamily:'poppins',fontWeight:500,letterSpacing:1}}>Category</span>} />
                </ListItemButton>

                <ListItemButton 
                onClick={() => navigate("/dashboard/displayallproducts")}
                >
                <ListItemIcon>
                    <AddShoppingCartIcon/>
                </ListItemIcon>
                <ListItemText primary={<span style={{fontFamily:'poppins',fontWeight:500,letterSpacing:1}}>Products</span>} />
                </ListItemButton>

                <ListItemButton 
                onClick={() => navigate("/dashboard/listproduct")}
                >
                <ListItemIcon>
                    <AddPhotoAlternateIcon/>
                </ListItemIcon>
                <ListItemText primary={<span style={{fontFamily:'poppins',fontWeight:500,letterSpacing:1}}>Product List</span>} />
                </ListItemButton>

                <ListItemButton 
               onClick={() => navigate("/dashboard/Banners")}
                >
                <ListItemIcon>
                    <AddPhotoAlternateIcon/>
                </ListItemIcon>
                <ListItemText primary={<span style={{fontFamily:'poppins',fontWeight:500,letterSpacing:1}}>Banners</span>} />
                </ListItemButton>
                <Divider/>
                <ListItemButton 
                //onClick={() => navigate("/dashboard/banners")}
                >
                <ListItemIcon>
                    <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary={<span style={{fontFamily:'poppins',fontWeight:500,letterSpacing:1}}>Logout</span>} />
                </ListItemButton>
                
            </List>
            
        </div>
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route element={<DisplayAllCategories/>} path={"/displayallcategories"}/>
            <Route element={<ProductCategory/>} path={"/productcategory"}/>
            <Route element={<DisplayAllProducts/>} path={"/displayallproducts"}/>
            <Route element={<Products/>} path={"/products"}/>
            <Route element={<ListProduct/>} path={"/listproduct"}/>
            <Route element={<Banners/>} path={"/Banners"}/>
          </Routes>
        </Grid>
        </Grid>
    </div>)

}