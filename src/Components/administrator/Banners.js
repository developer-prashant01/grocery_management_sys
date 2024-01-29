import React,{ useState,useEffect } from "react";
import {MenuItem,Select,Avatar, TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment, linkClasses} from "@mui/material";
import { DropzoneArea } from 'material-ui-dropzone';
import { useStyles } from "./BannersCss";
import { getData, postData } from "../ServerServices";
import Swal from "sweetalert2";
export default function Banners()
{
    /* backend of this is made into banner.js */

    const [companyId ,setCompanyId]=useState('');
    const [image,setImage]=useState('');
    const handleImage=(files)=>{
        setImage(files)
    }

    const handleSubmit=async()=>{
        var cd=new Date()
        var dd=cd.getFullYear()+'/'+(cd.getMonth()+1)+'/'+cd.getDate()+'   '+cd.getHours()+'-'+cd.getMinutes()+'-'+cd.getSeconds()
        var formData=new FormData();

        formData.append("companyid",companyId)
        formData.append("status",'true')
        formData.append("createdat",dd)
        formData.append("updatedat",dd)
        formData.append("createdby",'ADMIN')

        image.map((item,i)=>{
            formData.append("bannerpicture"+i,item);
            

        })
        

        var result= await postData('banner/add_banners',formData)
        if(result.status)
        {
            Swal.fire({
                icon: 'Success',
                title: 'Banners Updated Successfully',
              })
           
        }
        
   } 

   
    
    var classes=useStyles();
    return(
        <div className={classes.maincontainer}>
            <div className={classes.box}>
                <div style={{display:'flex',flexDirection:'row',marginBottom:10}}>
                    <div className={classes.headingStyle} style={{marginRight:10}}>Add Banners</div>
                    <div><img src='/assets/logo1.png' height='30px' width='30px'></img></div>
                </div>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth onChange={(event)=>setCompanyId(event.target.value)} label="Company Id" variant="outlined" />
                </Grid>
                <Grid item xs={12} >
                        <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Drag and drop an image here or click"}
                        onChange={(files) => handleImage(files)}
                        filesLimit={6}
                        />
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth onClick={handleSubmit} variant="contained">Submit</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button fullWidth variant="contained">Reset</Button>
                </Grid>
                </Grid>
            </div>
        </div>
    )
}