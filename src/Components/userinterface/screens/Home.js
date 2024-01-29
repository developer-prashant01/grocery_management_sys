import Header from "../usercomponents/Header"
import Footer from "../usercomponents/Footer"
import Deals from "../usercomponents/Deals"
import MainSlider from "../usercomponents/MainSlider"
import Spacer from "../usercomponents/Spacer"
import Treanding from "../usercomponents/Treanding"
import SpacerLarge from "../usercomponents/SpacerLarge"
import ExploreByCategories from "../usercomponents/ExploreByCategories"
import BestDeals from "../usercomponents/BestDeals"
import TreandingProducts from "../usercomponents/TreandingProducts"
export default function Home(props){

    return(<div>

        <Header/>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:10}}>
        <div style={{width:'90%'}}><MainSlider/></div> 
        <Spacer/>
        <div style={{width:'90%'}} ><Deals/></div>
        
    
        <Spacer/>
        <div style={{width:'90%'}}><Treanding/></div>
        <Spacer/>
        <div style={{width:'90%'}}><ExploreByCategories/></div>
        <Spacer/>
        <div style={{width:'90%'}}><BestDeals/></div>
        <Spacer/>
        <div style={{width:'90%'}}><TreandingProducts/></div>
       
        


        
        </div>
        
        

        

    </div>)

}