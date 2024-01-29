import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ServerURL, getData,postData } from "../ServerServices";
import { Avatar } from "@mui/material";
import { useStyles } from "./DisplayAllCompaniesCSS";
import {Switch,MenuItem,Select,TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment,DialogContent,Dialog,DialogTitle,DialogContentText,DialogActions} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export default function DisplayAllCompanies(props){

    var  navigate=useNavigate()

  
    const [companyLogo , setCompanyLogo ] = useState({fileName:'/assets/bottomicon.png',bytes:''})
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [companyName,setCompanyName]=useState('')
    const [ownerName,setOwnerName]=useState('')
    const [emailAdderss,setEmailAddress]=useState('')
    const [number,setNumber]=useState('')
    const [address,setAddress]=useState('')
    const [states,setStates]=useState([])
    const [cities,setCities] = useState([])
    const [companyId,setCompanyId] = useState('')
    const [status,setStatus]=useState('')
    const [buttonStatus,setButtonStatus]=useState(false)
    const [oldPicture,setOldPicture]=useState('')
    const [message,setMessage]=useState("")

    const fetchAllStates = async ()=>{
        
      var result = await getData('statecity/fetch_all_states')
      
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


const handleImage=(event)=>{

  setCompanyLogo({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setButtonStatus(true)
  

}
const handleCancel=()=>{

  setCompanyLogo({fileName:`${ServerURL}/images/${oldPicture}`,bytes:''})
  setOldPicture('')
  setButtonStatus(false)
  setMessage('')
}
const handleSaveLogo=async()=>{

  var formData=new FormData()
  formData.append('companyid',companyId)
  formData.append('logo',companyLogo.bytes)

  var result=await postData('company/update_company_logo',formData)
  if(result.status)
  {
    setMessage(<img src='/assets/cheched.gif' width='50' />)
  }
  else
  {
    setMessage(result.message)
  }
  fetchAllCompanies()
  setButtonStatus(false)


}
const handleDelete=async(rowData)=>{
    setCompanyId(rowData.companyid)
    var  body={'companyid':rowData.companyid}
   
    Swal.fire({
      title: 'Do you want Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var result=postData('company/delete_company',body)
        Swal.fire('Deleted!', '', 'success')
        fetchAllCompanies();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  

}
const handleStateChange =(event)=>{

      setState(event.target.value)
      fetch_all_cities(event.target.value)

}
const handlecitiesChange =(event)=>{
  setCity(event.target.value)

}
const handleClose =()=>{
  setOpen(false)
}
const handleStatus = (temp)=>{

  if(temp=="Pending")
  {
    setStatus('Verified')
  }
  if(temp=="Verified")
  {
      setStatus('Pending')
  }


}
const handleEdit =async()=>{
  var cd=new Date()
    var dd=cd.getFullYear()+'/'+(cd.getMonth()+1)+'/'+cd.getDate()+'   '+cd.getHours()+'-'+cd.getMinutes()+'-'+cd.getSeconds()
    var body={
      'companyname':companyName,
      'ownername':ownerName,
    'emailaddress':emailAdderss,
    'mobilenumber':number,
    'address':address,
    'state':state,
    'city':city,
    'updateat':dd,
    'createdby':'ADMIN',
    'status':status,
    'companyid':companyId,}
    var result =await postData('company/edit_company_data',body)
    if(result.status)
    {
        setOpen(false) 
        Swal.fire({
            icon: 'success',
            title: result.message
            
          })
         
    }
    else{
    setOpen(false)
    Swal.fire({
        icon: 'error',
        title: result.message
        
      })
    }
  
    fetchAllCompanies()
}
const PictureButton=()=>{

  return(<div>
      {buttonStatus?<div style={{display:'flex'}}>
        <Button onClick={handleSaveLogo} >Save</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>:<div>{message}</div>}
    
    </div>)
  
}

  const showCompanyDetails=()=>{

    return (
      <div>
       
        <Dialog
          open={open}
          //onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{display:'flex' ,justifyContent:'space-between'}} >
          <div style={{display:'flex',alignItems:'center'}}>
            <img src='/assets/logo1.png' height='30px' width='30px'></img>
            {"Edit Company"}
          </div>
            <div  style={{cursor:'pointer'}}>
              <CloseIcon  onClick={handleClose} />
                
            </div>
          </DialogTitle>
          <DialogContent>
          

                <Grid container spacing={2} style={{marginTop:5}}>
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
                    <Grid item xs={6}>
                      {status=='Pending'?<Switch onChange={()=>handleStatus(status)}/>:<Switch onChange={()=>handleStatus(status)} defaultChecked/>}
                      {status}
                    
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
                        <PictureButton/>
                    </Grid>
                    


                </Grid>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );



  }

  const [open, setOpen] = useState(false);

  const handleOpenDialog =(rowData)=>{
    
    setCompanyId(rowData.companyid)
    fetch_all_cities(rowData.state)
    setCompanyName(rowData.companyname)
    setOwnerName(rowData.ownername)
    setAddress(rowData.address)
    setCity(rowData.city)
    setState(rowData.state)
    setNumber(rowData.mobilenumber)
    setEmailAddress(rowData.emailaddress)
    setStatus(rowData.status)
    setCompanyLogo({fileName:`${ServerURL}/images/${rowData.logo}`,bytes:''})
    setOldPicture(rowData.logo)
    setOpen(true)
  }
  
  
  var classes=useStyles();
    const [companies,setCompanies]=useState([])
  const fetchAllCompanies = async ()=>{

    var result = await getData('company/fetchAllCompanies')
    setCompanies(result.data)
    //console.log(result.data)
    //console.log(companies)
  }
  useEffect(function (){

    fetchAllCompanies()

  },[])

    function showAllCompany() {
        return (
          <MaterialTable
            title=<span className={classes.headingStyle}>List Of Registered Companies</span>
            columns={[
              { title: 'Company Name',field:'companyname',
                render:rowData=><div>{rowData.companyname} <br/>{rowData.ownername}</div>
              },
              
              
              {title:'Address',field:'address',
                render:rowData=><div>{rowData.address} <br/> {rowData.cityname} <br/> {rowData.statename}</div>
                
              },
              {title:'Contacts', field:'mobilenumber',
                render:rowData=><div>{rowData.mobilenumber}<br/>{rowData.emailaddress}</div> 
              },
              {
                title:'Status',field:'status',
                render:rowData=><div>{rowData.status}</div>
              },
              {
                title:'Upated By',field:'createdat',
                render:rowData=><div>{rowData.createdat}<br/>{rowData.updateat}<br/>{rowData.createdby}</div>
              },
              {
                title:'Logo',
                render:rowData=><Avatar src={`${ServerURL}/images/${rowData.logo}`} style={{height:60,width:60}} variant="rounded"></Avatar>
              }
            ]}
            data={companies
              
            }        
            actions={[
              {
                isFreeAction:'true',
                icon:'add',
                tooltip:'Add Company',
                onClick:()=>navigate('/company')
              },
              {
                icon: 'edit',
                tooltip: 'edit user',
                onClick: (event, rowData) =>handleOpenDialog(rowData)


                
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData)=>handleDelete(rowData)
              }
            ]}
          />
        )
      }
      return( <div className={classes.maincontainer}>
        <div className={classes.box}>
        {showAllCompany()}
        {showCompanyDetails()}
        </div>
        </div>
        )

}