import React, { useState,useEffect } from "react";
import { Grid,TextField,Button } from "@mui/material";
import { Block } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OtpDialog from "./OtpDialog";
import { Dispatch } from "react";
import { useDispatch } from "react-redux";
export default function LoginDialog(props){
    var dispatch=useDispatch()
    const [otpState,setOtpState]=useState(false);
    const [open,setOpen]=useState(false);
    const [phoneNo,setPhoneNo]=useState("")
    const [otp,setOtp]=useState('')
   
    //console.log(phoneNo)

  
   // alert(" cccc"+props.dialogState)
    
   // alert(props.dialogState)
   const generateOtp=()=>{
    var gotp=parseInt(Math.random()*899999)+100000;
    setOtp(gotp)
    alert(gotp)
   }

   useEffect(function(){
    setOpen(props.dialogState)
   },[props.dialogState])
    const handleClick=()=>{

      var body={"address":''}
      dispatch({type:'ADD_USER',payload:[phoneNo,[body]]})
        setOpen(!open)
        props.setDialogState(!open)
        {generateOtp()}
        setOtpState(!otpState)

    }

   
   
    // const handleClose=()=>{
    //     setOpen(!open)
    //     props.pageRefresh(!props.refresh);
       
        
    // }
    
   
  
   
    return(
        <div>
        
        <Dialog
          open={open}
          //onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{style:{background:'linear-gradient(90deg, rgba(139,88,210,1) 43%, rgba(83,7,122,1) 86%)'}}}
         
        >
          
          <DialogContent>
          <div >
                <Grid container spacing={1} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid item xs={12}>
                        <h1 style={{color:'#182C61'}}>BABA TRADERS </h1>
                    </Grid>
                    <Grid item xs={12}>
                        <h1  style={{color:'#182C61'}}>Groceries delivered in 10 minutes</h1>
                    </Grid>
                    <Grid item xs={12}>
                       <input type='text' onChange={(event)=>setPhoneNo(event.target.value)} placeholder="+91 Enter Phone Number" style={{width:400,borderRadius:9999,padding:12}}></input>
                    </Grid>
                    <Grid item xs={12}>
                       <Button onClick={handleClick} 
                       variant='contained' 
                       disabled={phoneNo.length!==10}
                       style={{width:420,borderRadius:9999,height:40}}>Continue</Button>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                       <div><div>By continuing, you agree to our</div>

                           <div> Terms of Service &Privacy Policy</div></div>
                    </Grid>
                </Grid>
            </div>
            
          </DialogContent>
          {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions> */}
          
        </Dialog>
        <OtpDialog state={otpState}   setOtpState={setOtpState} otp={otp} setPhoneNo={setPhoneNo} phoneNo={phoneNo} dialogState={props.dialogState} setDialogState={props.setDialogState} handleClick={handleClick} pageRefresh={props.pageRefresh}  setBtnMsg={props.setBtnMsg}/>
        
      </div>
      
    )
   
}
    
    
