import React,{createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServerURL } from "../../ServerServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Deals()
{
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay:false
      };

    var images=['d1.webp','d2.webp','d3.webp','d4.webp','d5.webp','d6.webp','d7.webp','d8.webp']
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
                <div><img src={`${ServerURL}/images/${item}`} style={{width:'100%'}}/></div>
            )


        })
    }

    return (
        <div style={{position:'relative'}}>
            <div style={{background:'#fff',height:36,width:36,top:'30%',left:'1%',zIndex:1,position:'absolute',borderRadius:18,opacity:0.6}}>
                <KeyboardArrowLeftIcon onClick={handleLeftClick} style={{fontSize:36}}/>
            </div>
            <Slider ref={slider} {...settings}>
                
                {playImages()}
            </Slider>
            <div style={{background:'#fff',height:36,width:36,top:'30%',right:'1%',zIndex:1,position:'absolute',borderRadius:18,opacity:0.6}} >
            <KeyboardArrowRightIcon onClick={handleRightClick} style={{fontSize:36}}/>
            </div>
         </div>
    )



}