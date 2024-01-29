import React,{ useState,useEffect } from "react";
import {MenuItem,Select,Avatar, TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment} from "@mui/material";
import { useStyles } from "./ProductCategoryCss";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { postData } from "../ServerServices";
import ListIcon from '@mui/icons-material/List';
import { Navigate, useNavigate } from "react-router-dom"; 
export default function ProductCategory(props)
{
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var classes=useStyles();
    var navigate=useNavigate();
    const [categoryLogo,setCategoryLogo]=useState({fileName:'/assets/productcategorybottom1.png',bytes:''})
    const [companyid,setCompanyId]=useState(admin.companyid)
    const [categoryName,setCategoryName]=useState('')
    const [description,setDescription]=useState('')
   
    

    const handleImage=(event)=>{

        setCategoryLogo({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})

    }
    const handleClick =async() =>{
        var date=new Date()
        var  dd= date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+'   '+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds();
        var formData=new FormData()
        formData.append('companyid',companyid)
        formData.append('categoryname',categoryName)
        formData.append('description',description)
        formData.append('categoryLogo',categoryLogo.bytes)
        formData.append('createdat',dd)
        formData.append('updateat',dd)
        formData.append('createdby','USER')
        

        var result =await postData('productcategory/add_new_category',formData)
        //alert(result.status)
        clearData()
       
    }
    function clearData()
    {

      setDescription('')
      setCompanyId('')
      setCategoryLogo({fileName:'/assets/productcategorybottom1.png',bytes:''})
      //alert(rowData.categoryname)
      setCategoryName('')
      
    }


    return(
        <div className={classes.maincontainer}>
            <div className={classes.box}>
                <Grid item xs={12} style={{display:'flex', flexDirection:'row',justifyContent:"space-between" }}>
                    <div style={{display:'flex', flexDirection:'row' }}>
                  <div><img src="/assets/productcategory.png " width='70' ></img></div>  
                  <div className={classes.headingStyle} style={{marginTop:10,marginLeft:5}}>Category Of Products</div></div>
                    <div style={{marginRight:10}}><ListIcon fontSize="large" onClick={()=>navigate('/dashboard/DisplayAllCategories')} style={{'cursor':'pointer'}} ></ListIcon></div>
                    
                </Grid>
                <Grid container spacing={2} style={{marginTop:5}}>
                    <Grid item xs={12}>
                        <TextField  onChange={(event)=>setCompanyId(event.target.value)}  value={admin.companyid}  fullWidth  label="Company ID" variant="outlined" /> 
                            
                    </Grid>
                    <Grid item xs={12} >
                        <TextField value={categoryName} onChange={(event)=>setCategoryName(event.target.value)}    fullWidth  label="Category Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={7} >
                        <TextField value={description} onChange={(event)=>setDescription(event.target.value)}  sx={{width:400}} label="Description" multiline rows={5} />
                    </Grid>
                    <Grid item xs={5} className={classes.rowStyle}>
                        <IconButton fullWidth  color="primary" aria-label="upload picture" component="label">
                        <input hidden  accept="images/*" type="file"  onChange={handleImage} />
                        <PhotoCamera/>
                        </IconButton> 
                    <Avatar
                        alt="Bemy Sharp"
                        src={categoryLogo.fileName }
                        sx={{ width: 100, height: 100}}
                        variant='rounded'
                        style={{marginTop:25, marginLeft:20}}
                    />  
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth onClick={handleClick} variant="contained" style={{background:'#7f8c8d'}}>Submit</Button>
                    </Grid>
                    <Grid  item xs={6}>
                        <Button fullWidth  variant="contained" style={{background:'#7f8c8d'}}>Reset</Button>                   
                    </Grid>
                </Grid>
            </div>           

        </div>

    )



}