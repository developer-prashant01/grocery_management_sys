import Company from "./Components/administrator/Company";
import DisplayAllCompanies from "./Components/administrator/DisplayAllCompanies";
import SeperateProduct from "./Components/userinterface/usercomponents/SeperateProduct";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


//import ListProduct from "./Components/administrator/ListProduct";
import AdminLogin from "./Components/administrator/AdminLogin";
import Dashboard from "./Components/administrator/Dashboard";
import Home from "./Components/userinterface/screens/Home";
import HomePageDrawer from "./Components/userinterface/usercomponents/HomePageDrawer";
import ExploreByCategories from "./Components/userinterface/usercomponents/ExploreByCategories";
//import Banners from "./Components/administrator/Banners";
import CategoryWiseProducts from "./Components/userinterface/usercomponents/CategoryWiseProducts";
import Cart from "./Components/userinterface/screens/Cart";
import LoginDialog from "./Components/userinterface/screens/LoginDialog";
import Address from "./Components/userinterface/screens/Address";
import MakePayments from "./Components/userinterface/screens/MakePayments";


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route element={<Company/>} path={"/company"}/> 
          <Route element={<DisplayAllCompanies/>} path={"/displayallcompanies"}/>
          
          
          
          
          <Route element={<AdminLogin/>} path={"/adminlogin"}/>
          <Route element={<Dashboard/>} path={"/dashboard/*"}/>
          <Route element={<Home/>} path={"/home"}/>
          <Route element={<HomePageDrawer/>} path={"/homepagedrawer"}/>
          <Route element={<SeperateProduct/>} path={"/seperateproduct"}/>
          <Route element={<ExploreByCategories/>} path={"/explorebycategories"}/>
          
          <Route element={<CategoryWiseProducts/>} path={"/categorywiseproducts"}/>
          <Route element={<Cart/>} path={"/cart"}/>
          <Route element={<LoginDialog/>} path={"/logindialog"}/>
          <Route element={<Address/>} path={"/address"}/>
          <Route element={<MakePayments/>} path={"/makepayments"}/>
        </Routes>
      </Router>
     
      
    </div>
  );
}

export default App;
