import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Spacer from './Spacer';
import { ServerURL,postData,getData } from "../../ServerServices";
import SpacerLarge from './SpacerLarge';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React,{createRef} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import TreandingProducts from './TreandingProducts';
export default function Treanding()
{
    var navigate=useNavigate()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const [treandingProducts,setTreandingProducts]=useState([])
    
    const fetch_all_trending=async()=>{
      var result=await getData('userinterface/fetch_all_productsTreanding')
     // console.log("resultxxx",result)
  
      setTreandingProducts(result.data)
      //alert(JSON.stringify(result.data))
  
   }

   useEffect(function(){

      fetch_all_trending()
   },[])
    
    function handleLeftClick() {
        slider.current.slickNext()
        
    }

    function handleRightClick() {
        slider.current.slickPrev()   
    }
    var settings = {
        dots: false,
        infinite: true,
        speed:500 ,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:5000,
        arrow:false,
        responsive: [
            {
              breakpoint: 1324,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
                breakpoint: 1290,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
            },
            {
              breakpoint: 1100,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 880,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            },
            {
                breakpoint: 690,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
              
          ]
      };
    const handleClick=async(pid)=>{


      navigate(`/categorywiseproducts`,{state:{productid:pid,page:'Treanding'}})



    }
    // var treanding=[{'pname':'Amul Masti Dahi','pweight':'100g','actualprice':200,'offerprice':100,'image':'t1.webp'},
    //                 {'pname':'Amul Butter-Pasteurised','pweight':'500g','actualprice':269,'offerprice':100,'image':'t2.webp'},
    //                {'pname':'Amul Malai Paneer Fresh','pweight':'200g','actualprice':91,'offerprice':89,'image':'t3.jpeg'},
    //                {'pname':'Amul Moti Homogenised','pweight':'450ml','actualprice':269,'offerprice':100,'image':'t4.webp'},
    //                {'pname':"Lay's India's Magic Massala",'pweight':'2 Pieces','actualprice':40,'offerprice':'','image':'t5.jpg'},
    //                {'pname':'Fortune Kacchi Ghani Mustard oil(Bottel)','pweight':'1l','actualprice':160,'offerprice':146,'image':'t6.jpeg'},
    //                {'pname':'Uttam Sugar Sulphurless Sugar','pweight':'1kg','actualprice':65,'offerprice':49,'image':'t7.webp'},
    //                {'pname':'Aashirwad Shudh Chakki Atta','pweight':'10kg','actualprice':449,'offerprice':415,'image':'t8.webp'},
    //                {'pname':'Aashirwad Shudh Chakki Atta','pweight':'10kg','actualprice':449,'offerprice':415,'image':'t9.webp'}] 
    var slider=createRef()
    function playdata()
    {
        return treandingProducts.map((item)=>{
        return(
   
            <div>
                <Paper onClick={()=>handleClick(item.productid)} elevation={2} style={{display:'flex',margin:8 ,width:'90%',height:240,borderRadius:8}}>
                    <div style={{padding:5,width:'100%'}}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:90}}>
                        <div  style={{height:'50%',width:'55%',display:'flex',justifyContent:'center',alignItems:'center'}}><img src={`${ServerURL}/images/${item.image}`} style={{width:75,height:75}}/></div>
                        </div>
                        <Spacer/>
                        <div style={{fontWeight:700,fontSize:14,fontFamily:'poppins'}}>{item.pname}</div>
                        <Spacer/>
                        <div style={{fontWeight:600,fontSize:14,fontFamily:'poppins',opacity:0.7}}>Get Best Deals</div>
                        <Spacer/>
                        <div style={{width:matches?70:80,fontWeight:700,fontSize:14,width:'100%',opacity:'0.6'}}>Hurry Limited Stock</div>
                       
                        <Button variant="outlined"  style={{width:'99%',height:35,borderColor:'#e74c3c',color:'#e74c3c',textTransform: "none",marginTop:'20%'}}>Add</Button>
                    </div>
                </Paper>
            </div>

        )
        })
    }






    return (
        <div style={{position:'relative'}}>
           <div style={{fontWeight:700,fontSize:18,fontFamily:'poppins'}}>Treanding Products</div>
            <Spacer/>
            {matches?<></>:
            <div style={{background:'#fff',height:36,width:36,top:'30%',left:'1%',zIndex:1,position:'absolute',borderRadius:18,opacity:0.6}}>
                <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:36}}/>
            </div>}
            <Slider ref={slider} {...settings}>
                
                {playdata()}
            </Slider>
            {matches?<></>:
            <div style={{background:'#fff',height:36,width:36,top:'30%',right:'1%',zIndex:1,position:'absolute',borderRadius:18,opacity:0.6}} >
            <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:36}}/>
            </div>}
         </div>
    )
}