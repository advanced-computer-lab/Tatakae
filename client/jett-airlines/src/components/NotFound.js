import React from 'react'
import bg from '../assets/travelwallpaper-1.png'
import logo from '../assets/Logo.png'
import darktab from '../assets/darkglass.png'
import { makeStyles } from "@mui/styles"

export default function NotFound() {
    const styles = {
        background: {
          position: 'absolute',
          padding: 'auto',
          height: '100vh',
          width: '100vw',
          backgroundImage: `url(${bg})`
        },
    
        btnstyle: {
          height: '40px',
          width: '220px',
          margin: '-130px 0px 0px 20px',
          alignitems: 'center'
        },
    
        logoStyle: {
          height: '50px',
          margin: '50px',
          alignitems: 'left'
    
        },
        dg: {
          height: '150px',
          width: '100vw',
          margin: '-2.5vh -1.25vw',
    
          backgroundImage: `url(${darktab})`
        },
        media: {
          height: '150px',
          width: '100vw',
          margin: '0px auto',
        },
        paperStyle: {
          padding: 20,
          conetentFit: 'contain',
          minHeight: '100vh',
          maxHeight: 'auto',
          width: '90vw',
          margin: "0% 0% 0% 2.5%"
        },
        textStyle: {
          margin: '5px 0 0 0',
          Color: 'white'
        },
        checkboxContainer: {
          textAlign: 'right',
          height: '200px',
          margin: "0% 5% 0% 2.5%",
        },
        checkboxStyle: {
          margin: "12% 2% 0% 0%",
          color: 'white'
        },
      };

      const useStyles = makeStyles({
        typographyStyle: {
          color: "white",
          font: "Roboto",
        }
      });

      const classes = useStyles();

    return (
        <div style={styles.background}>
            <div style={styles.dg}>
            <img src={logo} alt='' style={styles.logoStyle} />
            </div>
        </div>
    )
}
