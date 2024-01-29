import { useState,useEffect } from "react";
import {Avatar,Switch,MenuItem,Select,TextField,Button,Grid,IconButton,FormControl,InputLabel,OutlinedInput,InputAdornment,DialogContent,Dialog,DialogTitle,DialogContentText,DialogActions} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MaterialTable from "@material-table/core";
import { ServerURL, getData, postData } from "../ServerServices";
import { useStyles } from "./DisplayAllCategoriesCss";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
export default function DisplayAllCategories(){
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
    var classes=useStyles()
    var nevigate=useNavigate();
    const [categoryLogo,setCategoryLogo]=useState({fileName:'/assets/productcategorybottom1.png',bytes:''})
    const [companyid,setCompanyId]=useState(admin.companyid)
    const [categoryName,setCategoryName]=useState('')
    const [description,setDescription]=useState('')
    const [categorys,setCategorys]=useState([])
    const [categoryId,setCategoryId]=useState('')
    const [open,setOpen]=useState(false)
    const handleImage=(event)=>{

      setCategoryLogo({fileName:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})

    }

    // const fetchAllCategories=async()=>{

    //     var result=await getData('productcategory/fetch_category')
    //     console.log(result.data)
    //     setCategorys(result.data)


    // }

    const fetchAllCategories=async()=>{

      var result=await postData('productcategory/fetch_category',{'companyid':companyid})
      console.log(result.data)
      setCategorys(result.data)


  }
    useEffect(function(){

        fetchAllCategories();



    },[])
    const handleCancel=()=>{

            setOpen(false)

    }
    const handleEdit=async()=>{
      var date=new Date()
      var dd= date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+'/'+'   '+date.getHours()+'-'+date.getMinutes()+'-'+date.getSeconds();
        //alert(categoryName)
      var body={
        
        
        'companyid':companyid,
        'categoryname':categoryName,
        'description':description,
        'updateat':dd,
        'createdby':'ADMIN',
        'categoryid':categoryId
      }
      var result=await postData('productcategory/update_category_data',body)
      //var result =await postData('company/edit_company_data',body)
      setOpen(false)
      if(result.status)
      {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
        })
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
        })
         
      }
      fetchAllCategories();
    }
///productcategory
    const handleDelete=async(rowData)=>{

        var body={'categoryid':rowData.categoryid}
        

          Swal.fire({
          title: 'Do you want to save the changes?',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Cancel`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            var res=postData('productcategory/delete_data',body)
            Swal.fire('Deleted!', '', 'success')
            fetchAllCategories();
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
        




    }


    // function logoButtons()
    // {
    //     <div>
    //       <Button variant="contained">Save</Button>
    //       <Button variant="contained">Cancel</Button>
    //     </div>

    // }

    


   
    const showCategoryDetail=()=>{

        return( <div>
            <Dialog
              open={open}
              //onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <Grid container spacing={2} style={{marginTop:5}}>
                    <Grid item xs={12}>
                        <TextField value={companyid} onChange={(event)=>setCompanyId(event.target.value)}    fullWidth  label="Company ID" variant="outlined" /> 
                            
                    </Grid>
                    <Grid item xs={12} >
                        <TextField value={categoryName} onChange={(event)=>setCategoryName(event.target.value)}    fullWidth  label="Category Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={7} >
                        <TextField  value={description} onChange={(event)=>setDescription(event.target.value)}  label="Description" multiline rows={5} />
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
                </Grid>
                
                
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEdit} >Save</Button>
                <Button   onClick={handleCancel}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>)

    }
   const handleClickDialog=(rowData)=>{
      setDescription(rowData.description)
      setCompanyId(rowData.companyid)
      setCategoryLogo({fileName:`${ServerURL}/images/${rowData.icon}`,bytes:''})
      //alert(rowData.categoryname)
      setCategoryName(rowData.categoryname)
      setCategoryId(rowData.categoryid)

    

      setOpen(true)



    }
     //     companyid varchar(45) 
    // categoryname varchar(45) 
    // description varchar(150) 
    // icon text 
    // createdat varchar(150) 
    // updateat varchar(150) 
    // createdby
  function showAllcategory(){
    return (

    <MaterialTable
        title="Display All Categories"
        columns={[
            {title:'ComapnyId' ,field:'companyid'},
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Description', field: 'description' },
            { title: 'Created at', field: 'createdat', },
            { title: 'Update at', field: 'updateat', },
            { title: 'Created By', field: 'createdby', },
            {title:'Image',
            render:rowData=><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{height:60,width:60}} variant="rounded"></Avatar>
 
             }
            
            
        ]}
        data={categorys
        
        }       
        actions={[
            {
              isFreeAction:'true',
              icon:'add',
              tooltip:'Add New Category',
              onClick:()=>nevigate('/dashboard/productCategory')


            },
            {
            icon: 'save',
            tooltip: 'Save User',
            onClick:  (event, rowData) =>handleClickDialog(rowData)
            },
            {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) =>handleDelete(rowData)
            }
        ]}
        />
    )
    }
    
      




    return(
        <div  className={classes.maincontainer}>
            <div className={classes.box}>

                {showAllcategory()}
                {showCategoryDetail()}



            </div>
        </div>

    )


}