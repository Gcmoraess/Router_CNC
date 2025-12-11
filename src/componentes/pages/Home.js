import {Link} from 'react-router-dom'
import ChatGPT_Router1 from '../../img/ChatGPT_Router1.png'
import styles from './Home.module.css'
import { AiOutlineAreaChart } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
import { FaWater } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdOutlineSensors } from "react-icons/md";

function Home () {
    return (
        <section className={styles.home_container}>
       
        <div className={styles.buttons_container}>
        <Link to="/homeDashbord">
        <button className={styles.button1}>Dashbord <AiOutlineAreaChart/></button>
        </Link>

        <Link to="/homeSensores">
        <button className={styles.button1}>Sensors <MdOutlineSensors /></button>
        </Link>

        <Link to="/homeCamera">
        <button className={styles.button2}>Camera <AiFillCamera /></button>
        </Link>

        <Link to="/homeNivelAgua">
        <button className={styles.button2}>Water level <FaWater /></button>
        </Link>

        <Link to="/homeLeds">
        <button className={styles.button2}>Leds <MdLightMode /></button>
        </Link>       
        </div>
        
        <div className={styles.img}> 
         <img src={ChatGPT_Router1} alt="Router" width='600px' height='650px' /> 
        </div>
        </section>
        
    )
}

export default Home