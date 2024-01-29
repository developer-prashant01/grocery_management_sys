import { useState,useEffect } from "react";
import  MaterialTable  from "@material-table/core";
import { useStyles } from "./DisplayAllProductsCss";
import { ServerURL, postData } from "../ServerServices";
import { Avatar } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

import { getData } from "../ServerServices";

export default function DisplayAllProducts(){
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [companyId,setCompanyId]=useState(admin.companyid)

    var classes=useStyles();
    var navigate=useNavigate();


    const [products,setProducts]=useState([])

    //-------------------------->>>>>>>>>>>>this api fatch data without on the basis of companyId
    // const fetchAllProducts=async()=>{    
    //     var result=await getData('products/fetch_product_data');
    //     console.log(result.data)
    //     setProducts(result.data)
    //    // console.log(products)

    // }


    //-------------------------->>>>>>>>>>>>this api fatch data without on the basis of companyId 
    const fetchAllProducts=async()=>{

        
        var result=await postData('products/fetch_product_data',{'companyid':companyId});
        console.log(result.data)
        setProducts(result.data)
       // console.log(products)

    }
    useEffect(function (){
        fetchAllProducts();


    },[])
    


    function showAllProducts()
    {
        return(
           
            <MaterialTable
                title="Display All Products"
                columns={[
                   
                    { title: 'Category Name',field:'categoryname',
                    render:rowData=><div>{rowData.cname}</div>
                    },
                    { title: 'Product Name',field:'categoryname',
                    render:rowData=><div><div>{rowData.productname}</div><div>{rowData.status}</div></div>
                    },
                    { title:'description',field:'Status',
                    render:rowData=><div>{rowData.desctiption}</div>
                    },
                    { title:'Deals',field:'deals',
                    render:rowData=><div>{rowData.deals}</div>
                    },
                    { title:'Treanding',field:'deals',
                    render:rowData=><div>{rowData.treanding}</div>
                    },
                    { title:'Price Type',field:'pricetype',
                    render:rowData=><div>{rowData.pricetype}</div>
                    },
                    { title:'Created At ',field:'createdby',
                    render:rowData=><div>{rowData.createdat}<br/> {rowData.createdby}</div>
                    },
                    { title:'Logo ',field:'image',
                    render:rowData=><Avatar src={`${ServerURL}/images/${rowData.image}`} style={{height:60,width:60}} variant="rounded"></Avatar>
                    }
                
                ]}
                data={products}        
                actions={[
                {
                    isFreeAction:'true',
                    icon:'add',
                    tooltip:'Add Products',
                    onClick:(event)=>navigate('/dashboard/Products')
                    


                },
                {
                    
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => alert("You saved " + rowData.name)
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => alert("You want to delete " + rowData.name)
                }
                ]}
            />
            
              
        )
    
    }

    
        return (
            <div className={classes.maincontainer}>
                <div  className={classes.box} >
                    {showAllProducts()}
                </div>
            </div>

        )
    
}