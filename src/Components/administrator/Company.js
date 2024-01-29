import React,{ useState,useEffect } from "react";
import {MenuItem,Select,Avatar, TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useStyles } from "./CompanyCss";
import { getData, postData } from "../ServerServices";
import Swal from "sweetalert2"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Navigate, useNavigate } from "react-router-dom";


export default function Company(props)
{
    const [showPassword, setShowPassword] = useState(false);
    const [companyLogo , setCompanyLogo ] = useState({fileName:'/assets/bottomicon.png',bytes:''})
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [companyName,setCompanyName]=useState('')
    const [ownerName,setOwnerName]=useState('')
    const [emailAdderss,setEmailAddress]=useState('')
    const [number,setNumber]=useState('')
    const [address,setAddress]=useState('')
    const [password,setPassword]=useState('')
    const [states,setStates]=useState([])
    const [cities,setCities] = useState([])


    var navigate=useNavigate()

  
    

    var classes=useStyles();
    const fetchAllStates = async ()=>{
        
        var result = await getData('statecity/fetch_all_states')
        //console.log(result.data)
        
        setStates(result.data)

    }
    useEffect(function (){

        fetchAllStates()

    },[])

    const fetch_all_cities = async(stateid)=>{

        var body = {'stateid':stateid}
        var result = await postData('statecity/fetch_all_cities',body)
        setCities(result.data)
        

    }

    const fillStates =()=>{
        return states.map((item)=>{
     
            return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
         })
    }
    const fillCities =()=>{
        return cities.map((item)=>{
     
            return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
         })
    }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleImage=(event)=>{

    setCompanyLogo({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})

  }
  const handleStateChange =(event)=>{

        setState(event.target.value)
        fetch_all_cities(event.target.value)

  }
  const handlecitiesChange =(event)=>{
    setCity(event.target.value)

  }
  const  clearData = async()=>{

    setCompanyName('')
    setOwnerName('')
    setAddress('')
    setCity('')
    setState('')
    setPassword('')
    setNumber('')
    setEmailAddress('')
    setCompanyLogo({fileName:'/assets/bottomicon.png',bytes:''})



  }
  const handleClick =async() =>{

    var cd=new Date()
    var dd=cd.getFullYear()+'/'+(cd.getMonth()+1)+'/'+cd.getDate()+'   '+cd.getHours()+'-'+cd.getMinutes()+'-'+cd.getSeconds()
    var foamData=new FormData()
    foamData.append('companyname',companyName)
    foamData.append('ownername',ownerName)
    foamData.append('emailaddress',emailAdderss)
    foamData.append('mobilenumber',number)
    foamData.append('address',address)
    foamData.append('state',state)
    foamData.append('city',city)
    foamData.append('password',password)
    foamData.append('logo',companyLogo.bytes)
    foamData.append('createat',dd)
    foamData.append('updateat',dd)
    foamData.append('createdby','ADMIN')
    foamData.append('status','Pending')
    var result =await postData('company/add_new_company',foamData)
    if(result.status)
    {
        Swal.fire({
            icon: 'success',
            title: result.message
            
          })
          
    }
    else
    Swal.fire({
        icon: 'error',
        title: result.message
        
      })

      {clearData()}

  }

  
    return(
        <div className={classes.maincontainer} >

            <div className={classes.box}>

                <Grid item xs={12} className={classes.rowStyle} style={{display:'flex',justifyContent:'space-between'}}>         
                        <div  style={{display:'flex',justifyContent:'space-between'}}>
                            <div style={{marginRight:10}}><img src='/assets/logo1.png' height='30px' width='30px'></img></div>    
                            <div className={classes.headingStyle}>

                                Company Registration
                            </div> 
                        </div>
                        <div>
                            <FormatListBulletedIcon onClick={(event)=>(navigate('/DisplayAllCompanies'))} style={{cursor:'pointer'}}/>
                        </div>
                    
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField   value={companyName} onChange={(event)=>setCompanyName(event.target.value)} fullWidth label="CompanyName" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event)=>setOwnerName(event.target.value)}   value={ownerName} fullWidth label="Ownwer Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  value={emailAdderss} onChange={(event)=>setEmailAddress(event.target.value)} fullWidth label="Email Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  value={number} onChange={(event)=>setNumber(event.target.value)} fullWidth label="Mobile Number" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField  value={address} onChange={(event)=>setAddress(event.target.value)} fullWidth label="Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">state</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state}
                            label="state"
                            onChange={handleStateChange}
                            >
                                <MenuItem value={'choose state'}>-Choose State-</MenuItem>
                                {fillStates()}
                            
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={city}
                            label="city"
                            onChange={handlecitiesChange}
                            >
                                <MenuItem value={'choose city'}>-Choose City-</MenuItem>
                                {fillCities()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} className={classes.rowStyle}>
                        <IconButton fullWidth  color="primary" aria-label="upload picture" component="label">
                            <input hidden  accept="images/*" type="file" onChange={handleImage} />
                            <PhotoCamera/>
                        </IconButton> 
                        <Avatar
                            alt="Bemy Sharp"
                            src={companyLogo.fileName}
                            sx={{ width: 56, height: 56 }}
                            variant='rounded'
                        />   
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event)=>setPassword(event.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <Button fullWidth onClick={handleClick} variant="contained" style={{background:'#7f8c8d'}}>Submit</Button>
                    </Grid>
                    <Grid  item xs={6}>
                        <Button fullWidth  onClick={clearData} variant="contained" style={{background:'#7f8c8d'}}>Reset</Button>                   
                    </Grid>

                </Grid>
            </div>

        </div>
    )

}