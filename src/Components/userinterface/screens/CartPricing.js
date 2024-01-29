import { Button, Divider, Grid } from "@mui/material"
import Spacer from "../usercomponents/Spacer"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState,useEffect } from "react";
import LoginDialog from "./LoginDialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CartPricing(props)
{
    const [btnMsg,setBtnMsg]=useState("Add Address To Proceed")

    var addressStatus = useSelector((state)=>state.user)

    useEffect(()=>{
        if(addressStatus == undefined)
    {
        setBtnMsg("Add Address To Proceed")
    }
    else
    {
        var dataKey = Object.keys(addressStatus)[0]
        if(addressStatus[dataKey])
        {
            setBtnMsg("Make Payment")
        }
    }
    },[addressStatus])
    

    // useEffect(function()
    // {
    //     //if(addressStatus != undefined)
    //     //{
    //     //addressStatus = JSON.parse(addressStatus)
    //     // var dataValue = Object.values(addressStatus)[0]

    //     if(addressStatus[dataKey][0].address!='')
    //     {
    //         setBtnMsg("Make Payment")
    //     }
    //     //}
    // },[addressStatus])


    var navigate=useNavigate();

    var userdata=null
    try{
        var user=useSelector((state)=>state.user)
         userdata=Object.values(user)[0]
        // console.log("userdatataaaaa",userdata)
    }
    catch(e){

    }
    //console.log("userdata:",userdata)
    
   // alert(JSON.stringify(props.products))
   
    var keys=Object.keys(props.products)
    var data=Object.values(props.products)
   // console.log("data",data)
    const [totalprice,setTotalPrice]=useState('');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const  md= useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const xxl = useMediaQuery(theme.breakpoints.down('xxl'));
    const [dialogState,setDialogState]=useState(false)
    const price=()=>{
        let total =data.reduce((a,b)=>{
            return a+parseInt(b.offerprice)*b.qty;

        },0);
        setTotalPrice(total);
    };
    useEffect(()=>{

        price()

    },[props])
    const handleDialogState=()=>{
        if(btnMsg=="Make Payment")
        {
            navigate("/makepayments")
        }
        else
        setDialogState(!dialogState)
    }



    return(
               
                
        <Grid  xs={12} >
            <Grid xs={12} style={{padding:'2%',display:'flex',justifyContent:'flex-end'}}>
                <div style={{display:'flex',alignItems:'center'}}>
                    <Button  variant="outlined" style={{lineHeight:'2vw',width:'8vw',borderColor:'#ff4757',background:'#fff'}}><span style={{fontSize:xs?0:sm?4:md?5:lg?9:xl?9:12,color:'#ff4757'}}>Empty Cart</span></Button>
                </div>
            </Grid>
             <Grid  xs={12} style={{height:'10vh',background:'#fff' ,display:'flex',flexDirection:'row',alignItems:'center',padding:'5%'}} >
                <div style={{marginRight:10}}><img src='/assets/offer.png'  width='40vw' height='30vw'></img></div>
                <div style={{fontSize:'1.1vw'}}>Avail Offers / Coupons</div>
             </Grid>
             <Spacer/>
             <Grid  xs={12} style={{height:'10vw',background:'#fff',padding:'2% 5% 2% 5%'}} >
                <div style={{display:'flex',justifyContent:'space-between'}} >
                    <div style={{fontWeight:'bolder',fontFamily:'poppins',fontSize:'1.2vw'}} >
                        Item Total
                    </div>
                    <div style={{fontWeight:'bolder',fontFamily:'poppins',fontSize:'0.9vw',opacity:'0.7'}}>
                            &#8377; {totalprice}
                    </div>
                </div>  
                <div style={{height:'1%'}}></div>
                <div style={{display:'flex',justifyContent:'space-between'}} >
                    <div style={{fontWeight:600,fontFamily:'poppins',fontSize:'0.8vw',color:'#a4b0be'}} >
                        
                        Handling Charge<span style={{fontWeight:800,fontFamily:'poppins',fontSize:'0.9vw',color:'lightgreen'}}> (&#8377;10 saved)</span>
                    </div>
                    <div style={{fontWeight:'bolder',fontFamily:'poppins',fontSize:'0.8vw',opacity:'0.7'}}>
                        <s>&#8377;15</s> &#8377;25
                    </div>
                    
                </div>
                <div style={{height:'2%'}}></div>
                <div style={{fontWeight:600,fontFamily:'poppins',fontSize:'0.9vw',color:'#a4b0be'}}>
                    Delivery Fee
                </div>
                <div style={{fontWeight:600,fontFamily:'poppins',fontSize:'0.9vw',color:'lightgreen'}}>
                    Add products worth &#8377;9 to  get Free delivery
                </div>
                <Spacer/>
                <div style={{fontWeight:'bolder',fontFamily:'poppins',fontSize:'0.9vw'}} >
                    To Pay
                </div>   

             </Grid>
             <Spacer/>
             <Grid  xs={12} style={{height:'10vw',background:'#fff',display:'flex' ,paddingLeft:'8%',paddingRight:'8%',paddingTop:10,flexDirection:'column'}} >
                <div style={{display:'flex',alignItems:'center'}}>
                    <Grid style={{marginRight:'1vw',display:'flex',width:'20%'}}><img src='/assets/location icon.png'  style={{width:xs?0:sm?15:md?35:lg?50:xl?60:70,height:xs?0:sm?15:md?35:lg?50:xl?60:70}}></img></Grid>
                    <Grid style={{fontSize:'1.0vw'}}>Enter your delivery address </Grid>
                    
                    <div>
                        {userdata!=undefined?<><div>{userdata[0]?.fullname}</div>
                        <div>{userdata[0]?.city}{userdata[0]?.state}</div>
                        <div>{userdata[0]?.zipcode}</div></>:<></>}
                    </div>

                </div>
                <div style={{height:'5%'}}></div>
                <div style={{display:'flex',alignItems:'center'}}>

                    {keys.length==0 ? <Button disabled={true} onClick={handleDialogState} variant="contained" style={{lineHeight:'2vw',width:'80vw',background:'#ff4757'}}><span style={{fontSize:xs?0:sm?4:md?5:lg?9:xl?13:13}}>{btnMsg}</span></Button>:
                     <Button onClick={handleDialogState} variant="contained" style={{lineHeight:'2vw',width:'80vw',background:'#ff4757'}}><span style={{fontSize:xs?0:sm?4:md?5:lg?9:xl?13:13}}>{btnMsg}</span></Button>}
                </div>
             </Grid> 
             <Divider/> 
            
                  <LoginDialog  dialogState={dialogState} setDialogState={setDialogState}  pageRefresh={props.pageRefresh} setBtnMsg={setBtnMsg}/>


        </Grid>
)



}