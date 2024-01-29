import { Paper,Grid, Divider} from "@mui/material"

export default function Footer(props){


    return(
       
    <div>
        <Divider/>
    <Paper elevation={1} style={{width:'100vw',height:300,position:'static',bottom:0,backgroundColor:'#dfe6e9'}}>
        <Grid container spacing={2}>
           
            <Grid item xs={3}>
                <div style={{marginTop:10}}><b >About Us</b></div>
                <div style={{marginTop:15 ,display:'flex',flexDirection:'column',justifyContent:'space-evenly' ,height:150}} >
                    <div>About Target</div>
                    <div>Careers</div>
                    <div>News & Blogs</div>
                    <div>Trend Brands</div>
                    <div>Bullseye Shop</div>
                </div>
            </Grid>
            <Grid item xs={3}>
                <b>Help</b>
                <div >
                    <div>About Target</div>
                    <div>Careers</div>
                    <div>News & Blogs</div>
                    <div>Trend Brands</div>
                    <div>Bullseye Shop</div>
                </div>
            </Grid>
            <Grid item xs={3}>
                 <b>Stores</b>
                 <div >
                    <div>About Target</div>
                    <div>Careers</div>
                    <div>News & Blogs</div>
                    <div>Trend Brands</div>
                    <div>Bullseye Shop</div>
                </div>
            </Grid>
            <Grid item xs={3}>
                <b>Services</b>
                <div >
                    <div>About Target</div>
                    <div>Careers</div>
                    <div>News & Blogs</div>
                    <div>Trend Brands</div>
                    <div>Bullseye Shop</div>
                </div>
            
            </Grid>
           
        //</Grid>
    </Paper>



        </div>



    )




}