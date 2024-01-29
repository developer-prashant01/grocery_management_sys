import { TextField,Grid } from "@material-ui/core";
import * as React from 'react';
import { useState,useEffect } from "react";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { postData } from "../../ServerServices";
import { useDispatch } from "react-redux";


export default function Address(props){

    // var user=useSelector((state)=>state.user)
    // var userdata=Object.values(user)[0]
    var dispatch=useDispatch()
    const [fullname,setFullname]=useState('');
    const [phonenumber,setPhonenumber]=useState('');
    const [state,setState]=useState('');
    const [city,setCity]=useState('');
    const [zipcode,setZipcode]=useState('');
    const [address,setAddress]=useState('');
    const handleClick= async()=>{
        var body={"userid":props.userData.userid,"fullname":fullname,"mobileno":props.userData.mobileno,"state":state,"city":city,"zipcode":zipcode,"address":address}
        var result=await postData('userinterface/add_user_address',body)
        if(result.status)
        {
            alert("address Submitted")
            dispatch({type:'ADD_USER',payload:[body.mobileno,[body]]})
           // props.setBtnMsg("Make Payment dsvkjdvhfkdj")
           props.pageRefresh()
            props.setAddressState();
            props.handleClose();
            
        }
        else
        {
            alert("fail to submitted")
        }
    };
    
    


    
      
        const [open, setOpen] = React.useState(props.addressState);
       // console.log("ssssssssssssssss",props.addressState)
        
        
        useEffect(()=>{
            setOpen(props.addressState)
            
    
        },[props.addressState])

        const handleClose=()=>{

            setOpen(!open)
            props.setAddressState(!props.addressState)
            props.handleClose()
           
            


        }
      
      
    
        
      return (
        <div>
         
          <Dialog
            open={open}
            //onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogContent>
            <div style={{width:'75%',background:'#fff'}}>
        
        <Grid container spacing={2} style={{background:'#dfe6e9',borderRadius:'1%'}}>
            <Grid item xs={12}>
                <div><h2>Add New Address</h2></div>
            </Grid>
            <Grid item xs={6}>
            <TextField onChange={(event)=>setFullname(event.target.value)} fullWidth id="outlined-basic" label="Full Name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
                <TextField value={props.userData.mobileno} onChange={(event)=>setPhonenumber(event.target.value)} fullWidth id="outlined-basic" label="Phone Number" variant="outlined" />   
            </Grid>
            <Grid item xs={4}>
                <TextField onChange={(event)=>setState(event.target.value)} fullWidth id="outlined-basic" label="state" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <TextField onChange={(event)=>setCity(event.target.value)}  fullWidth id="outlined-basic" label="city" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <TextField onChange={(event)=>setZipcode(event.target.value)} fullWidth id="outlined-basic" label="Zip Code" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
                <TextField  onChange={(event)=>setAddress(event.target.value)} fullWidth id="outlined-basic" label="Address" variant="outlined"   multiline-rows={2}/>
            </Grid>
            <Grid item xs={12}>
                <Button onClick={handleClick} fullWidth varient="contained"> submit</Button>
             </Grid>
        </Grid>
    </div>
            </DialogContent>
            <DialogActions>
              <Button  onClick={handleClose} >Cancel</Button>
              
            </DialogActions>
          </Dialog>
        </div>
      );



}