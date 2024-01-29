import React,{ useState,useEffect } from "react";
import {RadioGroup,FormControlLabel,FormLabel,Radio,Box,MenuItem,Select,Avatar, TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useStyles } from "./ProductCss";
import { getData, postData } from "../ServerServices";
import { Description } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
export default function Products(){
    var classes=useStyles();
    var navigate=useNavigate();
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    /* **************************************** * All The States Are Started from Here******************************************** */
    const [categorys,SetCategorys]=useState([])
    const [category,setCategory]=useState('')
    const [companyId,setCompanyId]=useState(admin.companyid)
    const [productName,setProductName]=useState('')
    const [description,setDescription]= useState('')
    const [status,setStatus]= useState('')
    const [treanding,setTreanding]=useState('yes')
    const [deals,setDeals]=useState('yes')
    const [priceType,setPriceType]=useState('')
    const [image,setImage]= useState({fileName:'/assets/bottomicon.png',bytes:''})
    


    /* ***************************************************************************************************************************** */
    
    // const fetchCategory=async()=>{

    //     var result=await getData('productcategory/fetch_category')
    //     //console.log(result.data)
    //     SetCategorys(result.data)
    // }
   
    // useEffect(function (){

    //     fetchCategory()

    // },[])

    const fetchCategory=async()=>{

        var result=await postData('productcategory/fetch_category',{'companyid':companyId})
        //console.log(result.data)
        SetCategorys(result.data)
    }
   
    useEffect(function (){

        fetchCategory()

    },[])

    const fillCategory =()=>{
        return categorys.map((item)=>{
     
            return(<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
         })
    }

    const handleImage=(event)=>{

        setImage({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    
      }

    const handleSubmit=async()=>{
        var cd=new Date()
        var dd=cd.getFullYear()+'/'+(cd.getMonth()+1)+'/'+cd.getDate()+'   '+cd.getHours()+'-'+cd.getMinutes()+'-'+cd.getSeconds()
        var formData=new FormData();

        formData.append('companyid',companyId)
        formData.append('categoryid',category)
        formData.append('productname',productName)
        formData.append('description',description)
        formData.append('status',status)
        formData.append('treanding',treanding)
        formData.append('deals',deals)
        formData.append('pricetype',priceType)
        formData.append('image',image.bytes)
        formData.append('createdat',dd)
        formData.append('updatedat',dd)
        formData.append('createdby','ADMIN')

        var result= await postData('products/add_product_data',formData)

        //products



    } 
    
    
    return(

        <div className={classes.maincontainer}>

            <div className={classes.box}>
                <Grid item xs={6} >
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <div>
                            <img src='/assets/logo1.png' width='50'></img>
                        </div>
                        <div className={classes.headingStyle} style={{marginTop:10,marginLeft:20}}>
                            Products
                        </div>
                    </div>
                    <div>
                        <ListIcon onClick={()=>navigate('/dashboard/displayallproducts')} style={{cursor:'pointer'}}/>
                    </div> 
                </div> 
                      
                </Grid>
                <Grid container spacing={2} style={{marginTop:5}}>
                        <Grid item xs={6}>
                            <TextField value={companyId}  fullWidth  label="Company ID" variant="outlined"  /> 
                                
                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={age}
                                label="Category Id"
                                onChange={(event)=>setCategory(event.target.value)}
                                >
                                <MenuItem value='{--Select Cetegory--}'>--Select Category--</MenuItem>
                                {fillCategory()}
                            
                                </Select>
                            </FormControl>
                            </Box> 
                        </Grid>
                        <Grid item xs={6} >
                            <TextField onChange={(event)=>setProductName(event.target.value)}    fullWidth  label="Product Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl>
                            <FormLabel >Status:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="yes"
                                name="radio-buttons-group"
                                row
                                onChange={(event)=>setStatus(event.target.value)}  
                            >
                                <FormControlLabel value="Available" control={<Radio />} label="Available" />
                                <FormControlLabel value="not available" control={<Radio />} label="Not Available" />
                                
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl>
                            <FormLabel >Treanding:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="yes"
                                name="radio-buttons-group"
                                row
                                onChange={(event)=>setTreanding(event.target.value)}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                
                            </RadioGroup>
                            </FormControl>

                        </Grid>
                        <Grid item xs={3}>
                            <FormControl>
                            <FormLabel >Deals:</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="yes"
                                name="radio-buttons-group"
                                row
                                onChange={(event)=>setDeals(event.target.value)}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                
                            </RadioGroup>
                            </FormControl>

                        </Grid>
                        <Grid item xs={6}>
                            <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={age}
                                label="Category Id"
                                onChange={(event)=>setPriceType(event.target.value)}
                                >
                                <MenuItem value='{--Select Cetegory--}'>--Select PriceType--</MenuItem>
                                <MenuItem  value='kiloGram'>KiloGram</MenuItem>
                                <MenuItem  value='kiloGram'>Gram</MenuItem>
                                <MenuItem value='Liter'>Liter</MenuItem>
                                <MenuItem  value='Nos'>Nos</MenuItem>
                            
                                </Select>
                            </FormControl>
                            </Box> 
                        </Grid>

                        <Grid item xs={6} >
                            <TextField  onChange={(event)=>setDescription(event.target.value)}  sx={{width:400}} label="Description" multiline rows={1} />
                        </Grid>
                        <Grid item xs={6} className={classes.rowStyle} >
                            <IconButton fullWidth  color="primary" aria-label="upload picture" component="label">
                            <input hidden  accept="images/*" type="file" onChange={handleImage} />
                            <PhotoCamera/>
                            </IconButton> 
                        <Avatar
                            alt="Bemy Sharp"
                            src={image.fileName }
                            sx={{ width: 90, height: 90}}
                            variant='rounded'
                            //style={{marginTop:25, marginLeft:20}}
                        />  
                            
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={handleSubmit} fullWidth variant="contained" style={{background:'#7f8c8d'}}>Submit</Button>
                        </Grid>
                        <Grid  item xs={6}>
                            <Button fullWidth  variant="contained" style={{background:'#7f8c8d'}}>Reset</Button>                   
                        </Grid>
                    </Grid>
                </div>
        </div>

    )
    
}