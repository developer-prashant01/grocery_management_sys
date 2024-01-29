import { Paper } from "@mui/material"
import { ServerURL,getData, postData } from "../../ServerServices"
import { useState,useEffect } from "react";
import Spacer from './Spacer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigate, useNavigate } from "react-router-dom";
import CategoryWiseProducts from "./CategoryWiseProducts";


export default function ExploreByCategories()
{
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [companyId,setCompanyId]=useState(admin.companyid)
    var navigate=useNavigate()
    const [category,setCategory]=useState([])
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    
    // const fetch_all_categories=async()=>{
    //     var result=await getData('userinterface/fetch_all_categories')
    //    // console.log("resultxxx",result)
    //     setCategory(result.data)
    // }

    const fetch_all_categories=async()=>{
        //alert(companyId)
        var result=await postData('userinterface/fetch_all_categories',{'companyid':companyId})
       // console.log("resultxxx",result)
        setCategory(result.data)
    }

    useEffect(function(){
        fetch_all_categories()
    },[])

    const handleClick=(categoryid)=>{
        //navigate(`/categorywiseproducts`,{state:{categoryid:categoryid}})
        navigate(`/categorywiseproducts`,{state:{categoryid:categoryid,page:'ExploreCategory'}})

    }



    function ExploreByCategories()
    {
            return category.map((item)=>{
                return(
                <Paper  onClick={()=>handleClick(item.categoryid)} style={{width:'9.056vw',height:'10.862vw',margin:3,background:'#ffe5ff',padding:10,display:'flex',flexDirection:'column',alignItems:'center',borderRadius:'5%',justifyContent:'space-between'}}>
                    <div style={{fontFamily:'poppins',fontSize:matches_sm?10:matches_md?12:14,fontWeight:'bolder',alignItems:'center',color:'#4d004c'}}>{item.categoryname}</div>  
                   <img src={`${ServerURL}/images/${item.icon} `} style={{width:'6vw',height:'6.5vw',margin:5}}/>
                </Paper>
               
                )


            })    
        
    }

    return(

        <div >
            <div style={{fontWeight:700,fontSize:18,fontFamily:'poppins'}}>Explore By Categories</div>
            <Spacer/>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                
                {ExploreByCategories()}
            </div>
        
        </div>
    )
}