import { useState,useEffect} from "react"
import { ServerURL,getData } from "../../ServerServices"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Spacer from "./Spacer";

export default function TreandingProducts(){
    const [treandingProducts,setTreandingProducts]=useState([]);
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const  md= useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const xxl = useMediaQuery(theme.breakpoints.down('xxl'));
    const [product,setProduct]=useState('')
    const fetch_all_dealproducts=async()=>{
        var result=await getData('userinterface/fetch_all_productsTreanding')
       // console.log("resultxxx",result)
    
        setTreandingProducts(result.data)
    
     }
 
     useEffect(function(){
 
        fetch_all_dealproducts()
     },[])

    var brandpro=[{'pname':'RedLabel','logo':'redlabel.png'}]

    function products(){
        return treandingProducts.map((item)=>{
                    return(<div style={{width:'10.417vw',height:'13.3015vw',background: "linear-gradient(180deg, rgba(11,1,51,0.9697128851540616) 3%, rgba(42,4,91,1) 67%, rgba(58,2,112,1) 87%)",display:'flex',flexDirection:'column',justifyContent:'space-between',
                    padding:'10px 10px 0px 10px',borderRadius:'1.2vw',margin:5,alignItems:'center'}}>
                <div style={{background:'white',padding:5,borderRadius:'0.25vw',fontFamily:'poppins',fontWeight:'bolder',color:'rgb(11,1,51)',display:'flex',justifyContent:'center',alignItems:'center',fontSize:xs?0:sm?4:md?5:lg?9:xl?13:16}}>
                    <div> Treandings</div>
                </div>
               
                <div style={{color:'white',textAlign:'center',fontSize:xs?0:sm?4:md?5:lg?9:xl?13:18,fontWeight:600}}>{item.productname}</div>
                <img src={`${ServerURL}/images/${item.image} `} style={{width:'6vw',height:'6.5vw',margin:5}}/>
                
            </div>)
            })
       
    }



    return(

        <div >
            <div style={{fontWeight:700,fontSize:18,fontFamily:'poppins'}}>Treanding Products</div>
            <Spacer/>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                
                {products()}
            </div>
        
        </div>
    )

}