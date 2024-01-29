import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState,useEffect } from "react";
import { useDispatch } from 'react-redux';
export default function PlusMinus(props){
    //console.log("dataplus",props.product)
    var product=props.product
    const theme = useTheme();
    var dispatch=useDispatch()
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const  md= useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const xxl = useMediaQuery(theme.breakpoints.down('xxl')); 
    const [value,setValue]=useState(props.product.qty)
    const handlePlus=()=>{
        var v=value+1;
        product['qty']=v;
        dispatch({type:'ADD_CART',payload:[product.productlistid,product]})
        setValue(v)
        props.pageRefresh()
    }
    const handleMinus=()=>{
        var v=value-1;
        if(v==0)
        {
            dispatch({type:'DELETE_CART',payload:[product.productlistid]})
            props.pageRefresh()
              
        }
        else if(v>0)
        {
            setValue(v)
            props.pageRefresh()
        }
        

    }

return(<div style={{display:'flex'}}>
                <span onClick={handlePlus} style={{marginRight:'4%',height:'1.75vw',width:'1.75vw',background:'#55efc4',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'15%',border:'0.01px solid black',cursor:'pointer'}}><span style={{fontSize:xs?0:sm?4:md?5:lg?9:xl?13:16}}>+</span></span>
                    <span style={{fontSize:xs?0:sm?4:md?5:lg?9:xl?11:12,display:'flex',justifyContent:'center',alignItems:'center'}}>{value}</span>          
                <span  onClick={handleMinus} style={{marginLeft:'4%',height:'1.75vw',width:'1.75vw',background:'#55efc4',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'15%',border:'0.01px solid black',cursor:'pointer'}}><span style={{fontSize:xs?0:sm?4:md?5:lg?9:xl?13:16}}>-</span></span>
                               
</div>)

}