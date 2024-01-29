import { makeStyles } from "@mui/styles"
export const useStyles=makeStyles({
maincontainer:{
    display:'flex',
    //justifyContent:"center",
    width:'100%',
    height:'100vh',
    background:'#dfe6e9',
    alignItems:'center'
},
box:{

    padding:20,
    width:'90%',
    background:'#fff',
    borderRadius:15,
    marginLeft:60,
   


},
headingStyle:{
    fontSize:18,
    fontWeight:'bolder',
    letterSpacing:1,
    fontFamily: 'Poppins',
    marginBottom:10,
    display:'flex',
    flexDirection:'row'

},
rowStyle:{
    display:'flex',
    flexDirection:'row'
}








})