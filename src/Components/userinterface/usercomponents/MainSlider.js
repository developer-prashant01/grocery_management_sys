import React,{createRef} from "react";
import { useEffect,useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServerURL, getData, postData } from "../../ServerServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function MainSlider()
{
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    //alert(admin.companyid)
    const [images,setImages]=useState([])
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
      };



    const fetch_banner_images=async()=>{
            //var body={"companyid":admin.companyid}
            var result=await getData('banner/fetch_banner_images')
           // console.log("result",result)
           var dataImages=result.data[0].bannerpicture
            var im=dataImages.substring(0,dataImages.length-1).split(",")
            //alert(im)
            setImages(im)
           
    }

    useEffect(function(){

        fetch_banner_images()


    },[])
    var slider=createRef()

    function handleLeftClick() {
        slider.current.slickNext()
        
    }

    function handleRightClick() {
        slider.current.slickPrev()   
    }
    
    function playImages()
    {
        return images.map((item)=>{
           
            return(
                <div><img src={`${ServerURL}/images/${item}`} style={{width:'100%',height:300}}/></div>
            )


        })
    }

    return (
        <div style={{position:'relative'}}>
        {matches?<></>:    
        <div style={{position:'absolute',top:'45%',left:'1%',zIndex:1,background:'#fff',display:'flex',alignItems:'center',opacity:0.6,height:36,width:36,borderRadius:18}}>
            <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:30}}/>
        </div>}
                
            <Slider ref={slider} {...settings}>
            
            {playImages()}
        </Slider>
        
        {matches?<></>:
        <div  style={{position:'absolute',top:'45%',right:'1%',zIndex:1,background:'#fff',display:'flex',alignItems:'center',opacity:0.6,borderRadius:18,height:36,width:36}}>
         <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:30}}/>
        </div>}
         </div>
    )



}