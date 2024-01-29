import { Divider, Grid, Paper,Button } from "@mui/material"
import Spacer from "../usercomponents/Spacer"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlusMinus from "./PlusMinus";
import { ServerURL } from "../../ServerServices";
import LoginDialog from "./LoginDialog";



export default function CartItem(props)
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const  md= useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const xxl = useMediaQuery(theme.breakpoints.down('xxl')); 
    console.log("cart products cartlist",props.products)
    var product=Object.values(props.products)
    console.log("productList cartlist",props.products)
    return(
               
                
                    <Grid  xs={12} >
                        <Grid xs={12} style={{padding:'2%',display:'flex'}}>
                                <div style={{fontSize:'1.175vw',fontFamily:'poppins',fontWeight:700}}> Cart ({Object.keys(props.products).length} Items)</div>
                                <div style={{width:'17vw' ,background:'#55efc4',color:'white',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'4%',fontSize:xs?0:sm?4:md?5:lg?9:xl?9:15}}>&#8377;20 Saved on this order</div>
                        </Grid>
                       
                        {product.map((item,i)=>{
                            return(
                                <div>
                         <Grid  xs={12} style={{height:'7vw',background:'#fff',display:'flex',padding:'5%'}} >
                       
                                <Grid xs={10} style={{display:'flex',alignItems:'center'}}>
                                    <Grid  xs={4} style={{marginRight:'1vw',display:'flex',width:'30vw',}}><img  src={`${ServerURL}/images/${item.productimage}`}  style={{width:xs?0:sm?25:md?35:lg?50:xl?60:70,height:xs?0:sm?25:md?35:lg?50:xl?60:70}}></img></Grid>
                                    <Grid xs={8}>
                                    <Grid  xs={12} style={{fontSize:'1.0vw'}}>{item.productname} </Grid>
                                    <Grid  xs={12} style={{fontSize:'1.0vw'}}>{item.weight}{item.pricetype} </Grid>
                                    <Grid  xs={12} style={{fontSize:'1.0vw'}}> &#8377;{item.offerprice}</Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={2} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                        <PlusMinus product={item} pageRefresh={props.pageRefresh}/>
                                </Grid>
                            </Grid>
                            <Divider /> 
                            </div>
                         )

                           
                        })}
          
                           
                            
                         <Spacer/>
                         <Grid  xs={12} style={{height:'10vw',background:'#fff',padding:'3%',display:'flex'}} >
                            <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}} >
                                <div style={{fontWeight:'bolder',fontFamily:'poppins',fontSize:'1.2vw'}} >
                                    Delivery Partner Tip
                                </div>
                                <div style={{fontWeight:'bolder',fontFamily:'poppins',fontSize:'0.9vw',opacity:'0.7'}}>
                                    The entire amount will be sent to your delivery partner
                                </div>
                                <div style={{display:'flex',fontWeight:'bolder',fontFamily:'poppins',fontSize:'0.9vw',opacity:'0.7',width:'22vw',justifyContent:'space-between'}}>
                                    <div style={{border:'1px solid black',borderRadius:9999,width:'5vw',height:'1.7vw',display:'flex',justifyContent:'center',alignItems:'center'}}>&#8377; 10</div>
                                    <div style={{border:'1px solid black',borderRadius:9999,width:'5vw',height:'1.7vw',display:'flex',justifyContent:'center',alignItems:'center'}}>&#8377; 20</div>
                                    <div style={{border:'1px solid black',borderRadius:9999,width:'5vw',height:'1.7vw',display:'flex',justifyContent:'center',alignItems:'center'}}>&#8377; 35</div>
                                    <div style={{border:'1px solid black',borderRadius:9999,width:'5vw',height:'1.7vw',display:'flex',justifyContent:'center',alignItems:'center'}}>&#8377; 50</div>
                                </div>
                            </div>   

                         </Grid>
                         <Spacer/>
                         
                        
                         <Grid  xs={12} style={{height:'3vw',background:'#fff',display:'flex' ,padding:'8%'}} >
                            <div style={{display:'flex',alignItems:'center'}}>
                                <div style={{marginRight:10}}><img src='/assets/cartlogo.png'  width='60vw' height='50vw'></img></div>
                                <div style={{fontSize:'1.25vw'}}>See how we ensure our delivery partner’s safetyLearn more</div>
                            </div>
                         </Grid>      
                       

                    </Grid>
                    
                   
                    
               
                    
                
         
        )


}
