import React, { useEffect, useState } from "react";
import { Grid,TextField,Button } from "@mui/material";
import { Block } from "@mui/icons-material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MuiOtpInput } from 'mui-one-time-password-input'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Address from "./Address";
import { postData } from "../../ServerServices";
import { useDispatch } from "react-redux";
export default function(props){
    var dispatch=useDispatch()
   
    const [open,setOpen]=useState(false);
    const [otp, setOtp] = React.useState('');
    const [newOtp,setNewOtp]=React.useState('');
    const [testOtp,setTestOtp]=useState(props.otp)
    const [addressState,setAddressState]=useState(false)
    const [userData,setUserData]=useState({userid:'',mobileno:''})
    
   
     useEffect(()=>{

        setOpen(props.state)
    },[props.state])

    const handleChange = ( newValue) => {
            setOtp(newValue)
     
    }
    const handleClose = () => {
      props.setPhoneNo('')
      props.setOtpState(!open)
      setOpen(!open)
      setOtp('')

}
async function  handleotp (){
 if(otp==props.otp)
 {
  //alert(props.phoneNo)
  var result=await postData("userinterface/add_new_user",{mobileno:props.phoneNo})
  if(result.status==0)
  {
    alert("server error")
  }
  else
  {
    if(result.status==2)
    {
      setUserData({userid:result.data[0].userid,mobileno:result.data[0].mobileno})
      setAddressState(true)
      props.setBtnMsg("Make Payment")
    }
    else if(result.status==1)
    {
      //alert(props.phoneNo)
      alert("mobileno already exist")
      var result_address=await postData('userinterface/check_user_address',{mobileno:props.phoneNo})
      if(result_address.status)
      {
        //props.setActive("mobileno already exist")
        //console.log(" pppppppppppppp",result_address.data[0].mobileno)
        dispatch({type:'ADD_USER',payload:[result_address.data[0].mobileno,result_address.data]})
        props.setBtnMsg("Make Payment")
        props.pageRefresh();
        //alert("address exist dispatch address3")
        handleClose();
        
      }
      else
      {
        //props.setBtnMsg("Make Payment")
        setUserData({userid:result.data[0].userid,mobileno:result.data[0].mobileno})
        setAddressState(!addressState)
      }
      
    }
  }
  

 }
 else
 {
  alert("incorrect")
 }

}
   // alert(props.State)
   
  

    return(
        <div>
        
        <Dialog
          open={open}
          
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{style:{background:'linear-gradient(90deg, rgba(139,88,210,1) 43%, rgba(83,7,122,1) 86%)'}}}
         
        >
          
          <DialogContent>
          <div >
                <Grid container spacing={1} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Grid item xs={12}>
                        <h1 style={{color:'#182C61'}}>Enter Otp </h1>
                    </Grid>
                    <Grid item xs={12}>
                        <h1  style={{color:'#182C61'}}>Groceries delivered in 10 minutes</h1>
                    </Grid>
                    <Grid item xs={12}>
                     <MuiOtpInput value={otp} onChange={handleChange} length={6}/>
                    </Grid>
                    <Grid item xs={12}>
                       <Button variant='contained' style={{width:420,borderRadius:9999,height:40}}>Continue</Button>
                    </Grid>
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                       <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'5%',width:'5%',backgroundColor:otp.length==6?'#fff':'gray',borderRadius:'50%'}}>
                          < ArrowForwardIcon onClick={handleotp}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
            
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
        </DialogActions>

          
        </Dialog>
        <Address userData={userData} setUserData={setUserData} addressState={addressState} setAddressState={setAddressState} open={open} setOpen={setOpen} handleClose={handleClose} pageRefresh={props.pageRefresh}  setBtnMsg={props.setBtnMsg} />
        
      </div>
    )
            


    



}
    
    
