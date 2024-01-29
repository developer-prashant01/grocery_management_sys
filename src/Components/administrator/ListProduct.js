import React,{ useState,useEffect } from "react";
import {RadioGroup,FormControlLabel,FormLabel,Radio,Box,MenuItem,Select,Avatar, TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useStyles } from "./ListProductCss";
import { getData, postData } from "../ServerServices";
import { Description } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import ListIcon from '@mui/icons-material/List';
import { DropzoneArea } from 'material-ui-dropzone';


export default function ListProduct(){

   var classes=useStyles();
   var admin=JSON.parse(localStorage.getItem('ADMIN'))
   //console.log('admin',admin)
    const [companyId,setCompanyId]=useState(admin.companyid)
    const [category,setCategory]=useState('')
    const [product,setProduct]=useState('')
    const [weight,setWeight]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [description,setDescription]= useState('')
    const [categorys,SetCategorys]=useState([])
    const [products,setProducts] = useState([])
    const [image,setImage]= useState([])
   

    const handleSubmit=async()=>{
        var cd=new Date()
        var dd=cd.getFullYear()+'/'+(cd.getMonth()+1)+'/'+cd.getDate()+'   '+cd.getHours()+'-'+cd.getMinutes()+'-'+cd.getSeconds()
        var formData=new FormData();

        formData.append("companyid",companyId)
        formData.append("categoryid",category)
        formData.append("productid",product)
        formData.append("weight",weight)
        formData.append("price",price)
        formData.append("offerprice",offerPrice)
        formData.append("description",description)
        
        formData.append("createdat",dd)
        formData.append("updatedat",dd)
        formData.append("createdby",'ADMIN')

        image.map((item,i)=>{
            formData.append("picture"+i,item);
            

        })

        var result= await postData('listproduct/add_new_listproduct',formData)

   } 

        //------------>>>>>>>>>>>>>>this below commented api fetch category without applying companyid condition
    // const fetchCategory=async()=>{

    //     var result=await getData('productcategory/fetch_category')
    //     //console.log(result.data)
    //     SetCategorys(result.data)
    // }

    //------------>>>>>>>>>>>>>>this below commented api fetch category with applying companyid condition
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
    const fetchProduct=async(categoryid)=>{
        var body ={'categoryid':categoryid}
        var result=await postData('listproduct/fetch_all_product',body)
        //console.log(result.data)
        setProducts(result.data)
    }
    const handleCategoryChange=(event)=>{

        setCategory(event.target.value)
        fetchProduct(event.target.value)

    }
    const fillProducts =()=>{
        return products.map((item)=>{
     
            return(<MenuItem value={item.productid}>{item.productname}</MenuItem>)
         })
    }
    const handleImage=(files)=>{
        setImage(files)
    }

    


    return(

        <div className={classes.maincontainer}>

            <div className={classes.box}>
                <Grid item xs={6} style={{display:'flex',flexDirection:'row'}}>           
                <div>
                    <img src='/assets/listproductheading.png' width='100'></img>
                </div>
                <div className={classes.headingStyle} style={{marginTop:10,marginLeft:10}}>
                    Product List
                </div>
                        
                </Grid>
                <Grid container spacing={2} style={{marginTop:5}}>
                        <Grid item xs={4}>
                            <TextField onChange={(event)=>setCompanyId(event.target.value)} value={companyId} fullWidth  label="Company ID" variant="outlined"  /> 
                                
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={age}
                                label="Category Id"
                                onChange={ handleCategoryChange}
                                >
                                <MenuItem value='{--Select Cetegory--}'>--Select Category--</MenuItem>
                                {fillCategory()}
                            
                                </Select>
                            </FormControl>
                            </Box> 
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product Id</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                //value={age}
                                label="Product Id"
                                onChange={(event)=>setProduct(event.target.value)}
                                
                                >
                                <MenuItem  value='{--Select Product--}'>--Select Product--</MenuItem>
                                {fillProducts()}                            
                                </Select>
                            </FormControl>
                            </Box> 
                        </Grid>
                        <Grid item xs={4} >
                            <TextField onChange={(event)=>setWeight(event.target.value)}    fullWidth  label="Weight" variant="outlined" />
                        </Grid>
                        <Grid item xs={4} >
                            <TextField onChange={(event)=>setPrice(event.target.value)}    fullWidth  label="Price" variant="outlined" />
                        </Grid>
                        <Grid item xs={4} >
                            <TextField onChange={(event)=>setOfferPrice(event.target.value)}    fullWidth  label="Offer Price" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField  fullWidth onChange={(event)=>setDescription(event.target.value)}   label="Description" multiline rows={1} />
                        </Grid>
                        <Grid item xs={12} className={classes.rowStyle} >
                        <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => handleImage(files)}
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