import React,{createRef, useState,useEffect} from "react";
import Header from "../usercomponents/Header";
import SpacerLarge from "../usercomponents/SpacerLarge"
import Spacer from './Spacer';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider,Button, useScrollTrigger } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServerURL,postData } from "../../ServerServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {  useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function SeperateProduct(){
  var dispatch=useDispatch()
  let location=useLocation();
  var data=JSON.parse(location.state.data)
  //console.log("Seperate Product Page",data)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const  md= useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const xl = useMediaQuery(theme.breakpoints.down('xl'));
  const xxl = useMediaQuery(theme.breakpoints.down('xxl'));
  const [refresh,setRefresh]=useState(false)
  
  //var images=['p1.webp','pic2.webp','p3.webp','p4.webp']
  const [sliderImages,setSliderImages]=useState([])
  var slider=createRef()
  function handleLeftClick()
  {
    slider.current.slickNext()
  }
  const [productList,setProductList]=useState([])
  const fetch_all_productlist_by_productid = async() =>{
      var result = await postData('userinterface/fetch_trending_products_by_productid',{'productid':data.productid})
      setProductList(result.data)
      console.log("Seperate Product list",result.data)
      //console.log("dddd",result.data[0].images)
      var image=result.data[0].images
      console.log("images",result.data[0].images)
      var im=image.substring(0,image.length-1).split(",")
      setSliderImages(im)
      
     
  
  }
  useEffect(function(){
    fetch_all_productlist_by_productid()
    },[])

  //var images=productList.images
  console.log(sliderImages)


    /*-------------------->>>>>>>>>>>>>>>>  this function is made for handling cart*/
    const handleDispatch=(item)=>{
      item['qty']=1
        dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
        setRefresh(!refresh)

    }

function handleRightClick() {
    slider.current.slickPrev()   
}
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:false
  };
  function playImages()
    {
        return sliderImages.map((item)=>{
           
            return(
                <div ><img src={`${ServerURL}/images/${item}`} style={{width:'50%',height:200,paddingRight:'25%',paddingLeft:'25%',paddingTop:'15%'}}/></div>
            )


        })
    }

  const fetch_products_data=()=>{

    return productList.map((item)=>{

            return(<div> <Paper elevation={10}  style={{height:60,width:'95%',borderRadius: 10,borderColor: 'purple',padding:15}} variant="outlined" square={true} >
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <div style={{width:'13vw'}}>
                    <div style={{fontSize:16 ,fontWeight:900,fontFamily:'poppins'} }>
                        {item.weight} {item.pricetype}
                    </div>
                    <Spacer/>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
                      <div style={{display:'flex',fontSize:'1.3vw',fontWeight:400,alignItems:'center'} }>   
                          &#x20b9; {item.price}  
                      </div>
                      <div style={{display:'flex',fontSize:'1vw',fontWeight:'300',alignItems:'center',opacity:'0.9'} }>   
                          &#x20b9; <s>{item.offerprice}</s> 
                      </div>
                      <Paper elevation={2} style={{display:'flex',background:'#8854d0',width:'6vw',height:'2vw',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'1vw',borderRadius:'0.5vw'}}><center>6% off</center></Paper>
                    </div>
                </div>
                <div style={{display:'flex',alignItems:'center'}}>
                      <Button onClick={()=>handleDispatch(item)} variant="contained" style={{lineHeight:'30px'}}><span style={{fontSize:xs?0:sm?4:md?5:lg?9:xl?13:13}}>Add Cart</span></Button>
                </div>
            </div>

        </Paper>
        <Spacer/>
        </div>)



    })

  }


return(
  <div>
    <Header/>
    <div style={{paddingTop:40,paddingRight:'5%',paddingLeft:'5%',paddingBottom:40,height:'100vh'}}>
    
      <Grid container spacing={2} >

          <Grid item xs={6}>
           
              <Paper elevation={1} style={{height:'90%',width:'90%'}}>
              <div style={{position:'relative'}}>
        <div style={{position:'absolute',top:'45%',left:'1%',zIndex:1,background:'#fff',display:'flex',alignItems:'center',opacity:0.6,height:36,width:36,borderRadius:18}}>
            <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:30}}/>
        </div>
                
            <Slider ref={slider} {...settings}>
            
            {playImages()}
        </Slider>
        

        <div  style={{position:'absolute',top:'45%',right:'1%',zIndex:1,background:'#fff',display:'flex',alignItems:'center',opacity:0.6,borderRadius:18,height:36,width:36}}>
         <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:30}}/>
        </div>
         </div>

              </Paper>
           
        </Grid>



        <Grid item xs={6} >

          <div>
            <div style={{fontFamily:'poppins',fontSize:16}}>
              Home>Powders&pastes>MDH Degii Mirchi Powder
            </div>
            <div style={{fontSize:22 ,fontWeight:500} }>
              <SpacerLarge/>
              {data.productname}
            </div>
            <div style={{fontSize:16 ,fontWeight:100,fontFamily:'poppins',opacity:0.6} }>
              <SpacerLarge/>
              {data.weight} {data.pricetype}
            </div>
            <SpacerLarge/>
            <div style={{display:'flex',flexDirection:'row'}} >
                              <div style={{display:'flex',fontSize:'1.7vw',fontWeight:500,marginRight:'1vw',alignItems:'center'} }>   
                                  &#x20b9; {data.price}  
                              </div>
                              <div style={{display:'flex',fontSize:'1.2vw',fontWeight:500,marginRight:'1vw',alignItems:'center',opacity:'0.7'} }>   
                                  &#x20b9; <s>{data.offerprice}</s> 
                              </div>
                              <Paper elevation={2} style={{display:'flex',background:'#8854d0',width:'6vw',height:'2vw',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'1vw',borderRadius:'0.5vw'}}><center>{parseInt((parseInt(data.price)-parseInt(data.offerprice))/parseInt(data.price)*100) } %off</center></Paper>
                            </div>
            <SpacerLarge/>
            <Divider/> 
            <SpacerLarge/>
            
                   

            <div>
                <div style={{fontSize:18 ,fontWeight:800,fontFamily:'poppins'} }>
                  Select the Quantity
                </div>
                <Spacer/>
                {fetch_products_data()}

               
                

            </div>
          </div>
          
        </Grid>
      </Grid>
      <Grid container spacing={2}>
            <Grid item xs={6}>
              <div style={{fontWeight:700}}>
                About Product
              </div>
              <div>
                <ul style={{opacity:0.6}}>
                  <li>
                  Description : MDH deggi mirch is made from the finest chilies. It not only imparts a spicy hot flavor to cooked dishes, but also lends a wonderful rich red color. This spice is also replete with nutrients which are good for your health. Coming from the house of MDH, which is known for its vast offering of spices, this masala is a must for Indian kitchens.
                  </li>
                  <Spacer/>
                  <li>
                  Country of Origin : India
                  </li>
                  <Spacer/>
                  <li>
                  Shelf Life : 12 months
                  </li>
                  <Spacer/>
                  <li>
                  FSSAI License : 10012011000697
                  </li>
                  <Spacer/>
                  <li>
                  Manufacturer Name : Mahashian Di Hatti Pvt Ltd
                  </li>
                  <Spacer/>
                  <li>
                  Manufacturer Address : Mahashian Di Hatti Pvt Ltd, Dl 9/44 Kirti Nagar Industrial Area New Delhi 110015.
                  </li>
                  <Spacer/>
                </ul>
              </div>
            </Grid>
      </Grid>

    </div>
    </div>
)

}