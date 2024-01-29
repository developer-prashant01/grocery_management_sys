import { Grid } from "@mui/material";
import CartPricing from "./CartPricing";
import CartItem from "./CartItem";
import Header from "../usercomponents/Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Cart(props){
    const dispatch=useDispatch()
    const products=useSelector((state)=>state.cart);
    const productList=Object.values(products)
    const keys=Object.keys(products)
    const [refresh,setRefresh]=useState(false)
    //console.log("cart products",productList)
    //console.log("cart products keys",productList)
    const pageRefresh=()=>{
        setRefresh(!refresh)
        alert("hi")
    }


    return(
        <div style={{background:'#dcdde1'}}>
            <Header/>
           
            <div style={{height:'5vw',width:'100vw',display:'flex',justifyContent:'center',alignItems:'center',background:'linear-gradient(90deg, rgba(69,32,124,1) 17%, rgba(106,41,167,1) 50%, rgba(69,32,124,1) 77%)'}}>
                    <Grid  style={{marginRight:'1vw',display:'flex',width:'5%'}}>
                    <img src='/assets/header2.svg' height='80vw' width='70vw'></img>          
                    </Grid>
                    <Grid style={{color:'#fff',fontSize:'1.25vw'}}>Delivering to you in 7 mins</Grid>
            </div>
            <Grid container spacing={2} style={{width:'100vw',height:'100%',padding:'2% 10% 0% 10%'}}>
                <Grid   item xs={8}>
                <CartItem products={products} pageRefresh={pageRefresh}/>
                </Grid>

                <Grid   item xs={4}>
                    <CartPricing products={products} pageRefresh={pageRefresh} refresh={refresh}/>
                </Grid> 
            </Grid>
           
        </div>
    )

}