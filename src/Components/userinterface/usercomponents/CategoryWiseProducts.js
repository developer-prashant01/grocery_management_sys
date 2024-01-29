import React,{ useState,useEffect } from "react";
import Header from "./Header";
import {MenuItem,Select,Avatar, TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment} from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { ServerURL,getData, postData } from "../../ServerServices";
import Spacer from "./Spacer";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CategoryWiseProducts(){
    var navigate=useNavigate()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [companyId,setcompanyId]=useState(admin.companyid)
    const dispatch=useDispatch()
    const [refresh,setRefresh]=useState(false) //we use refresh for rendering the page to see result into top cart 
    let location =useLocation()
  //  console.log("Locationprashantsss:",location)
  //console.log("ADMIN",admin)
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [category,setCategory]=useState([])
    const [categoryProducts,setCategoryProducts]=useState([])
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const  md= useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const xxl = useMediaQuery(theme.breakpoints.down('xxl'));
    const[categoryId,setCategoryId]=useState(location.state.categoryid)
    const[productId,setProductId]=useState(location.state.productid)
    
    
    //alert(location.state.categoryid)

        // /* handle right side  code  */
        const fetch_CategoryProducts = async() =>{
           // console.log("Locationprashantgupta:",categoryId)
            var result = await postData('userinterface/fetch_category_products',{'categoryid':categoryId})
            setCategoryProducts(result.data)
            // alert(JSON.stringify(result.data))
        }
     
    // useEffect(function(){

    // fetch_CategoryProducts()
    // },[])

    const handlePageChange=(item)=>{

        navigate('/seperateproduct',{state:{data:JSON.stringify(item)}})
    }

    const handleClick=(item)=>{
        item['qty']=1
        dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
        setRefresh(!refresh)


    }  

    
        function products(){
            return categoryProducts.map((item)=>{
                        return(<div  onClick={()=>handlePageChange(item)} style={{padding:12,background:'white',border: '0.2px solid grey',width:'13vw',height:'18vw',margin:0.5,display:'flex',flexDirection:'column'}}>
                            <div style={{height:'11vw',width:'13vw',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between'}}>
                                
                                <div  style={{display:'flex',justifyContent:'center'}}><img src={`${ServerURL}/images/${item.productimage}`} style={{width:'8vw',height:'8vw'}}/></div>
                                <div style={{fontSize:'1vw',fontWeight:'bolder'}}>{item.productname}</div>
                            </div>
                                <div style={{height:'2vw'}}></div>
                                <div style={{fontSize:'1vw',textAlign:'left'}}>{item.weight}{item.pricetype}</div>
                                <div style={{height:'2vw'}}></div>
                        <div style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between'}}>
                            <div>
                            <div style={{fontsize:'0.25vw',fontWeight:700,opacity:'0.7'}}>&#x20b9;<s>{item.price}</s></div>
                            <div style={{fontsize:'0.25vw',fontWeight:700}}>&#x20b9;{item.offerprice}</div>
                            </div>
                            <Button variant="outlined" onClick={()=>handleClick(item)} size="large" style={{borderColor:'#e74c3c',color:'#e74c3c',textTransform: "none"}}>Add</Button>
                            
                        </div>
                            
                            </div>
                        )
                })
           
        }
    const fetch_all_productlist_by_productid = async() =>{
        // console.log("Locationprashantgupta:",categoryId)
            var result = await postData('userinterface/fetch_trending_products_by_productid',{'productid':productId})
           // alert(productId)
            setCategoryProducts(result.data)

            // alert(JSON.stringify(result.data))
        }

    

    /* left side  start */
    const handleCategoryId=(item)=>{
       //alert(item.categoryid)
        setCategoryId(item.categoryid)
        //location.state.page=="ExploreCategory"
        
    }

    useEffect(function(){
        
        if(location.state.page=="ExploreCategory"){
            //alert(categoryId)
            fetch_CategoryProducts()
        }
        else if(location.state.page=="Treanding"){
            fetch_all_productlist_by_productid()
        }

        
        },[categoryId,productId])
        
    // const fetch_all_categories=async()=>{
    //     var result=await getData('userinterface/fetch_all_categories')
    //    // console.log("resultxxx111",result)
    //     setCategory(result.data)
    // }

    const fetch_all_categories=async()=>{
        var result=await postData('userinterface/fetch_all_categories',{'companyid':companyId})
       // console.log("resultxxx111",result)
        setCategory(result.data)
    }

    useEffect(function(){
        fetch_all_categories()
    },[])



    function sideCategory()
    {
        return category.map((item)=>{
        return(
            <div>
        <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          
        >
          <ListItemIcon>
          <img src={`${ServerURL}/images/${item.icon} `} style={{width:'3vw',height:'3.5vw',margin:0}}/>
          </ListItemIcon>
          <ListItemText disableTypography style={{fontWeight:'bold',fontSize:xs?0:sm?4:md?5:lg?9:xl?13:18}} onClick={()=>handleCategoryId(item)} primary={item.categoryname} />
        </ListItemButton>
        
      </List>

            </div>
        )
        })
        
    }

    
    

    /* handle left side finish  */

    return(<div>
        <Header/>
        
            <Grid container spacing={2}>
                <Grid item xs={2} >
                    <Spacer/>
                    {sideCategory()}
                </Grid>
                <Grid item xs={10} >
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>                        
                        {products()}
                    </div>

                </Grid>
                
            </Grid>
        </div>
    )



    
}