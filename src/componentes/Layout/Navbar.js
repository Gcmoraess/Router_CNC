import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'

import Container from './Container'
import logoSyntroBranco from '../../img/logoSyntroBranco.png'

import { AiOutlineAreaChart } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
import { FaWater } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdOutlineSensors } from "react-icons/md";
import { LiaTemperatureHighSolid } from "react-icons/lia";

function Navbar () {
    return (
        <>   
        <nav className={styles.navbar}>   

          <Container className={styles.navbarContainer}>
            
            <Link to="/" className={styles.imglogo}>
                 <img src={logoSyntroBranco}
                 alt="Logo da empresa"
                 width="325px"
                 height="75px"
                 />
            </Link>

          </Container>
          
        </nav>

            <div className={styles.subnav}>
                
                <Link to="/homeDashbord" className={styles.item}>
                    Dashbord
                    < AiOutlineAreaChart />
                </Link>

                <Link to="/homeCamera" className={styles.item}>
                    Camera
                    < AiFillCamera />
                </Link>

                <Link to="/homeLeds" className={styles.item}>
                    Leds
                    < MdLightMode />
                </Link>
    
                <Link to="/homeNivelAgua" className={styles.item}>
                    Water Level
                    < FaWater />
                </Link>

                <Link to="/homeTemperature" className={styles.item}>
                    Temperature
                    < LiaTemperatureHighSolid />
                </Link>

                <Link to="/homeSensores" className={styles.item}>
                    Sensors
                    < MdOutlineSensors />
                </Link>
         </div>
    </>
  )
}

export default Navbar