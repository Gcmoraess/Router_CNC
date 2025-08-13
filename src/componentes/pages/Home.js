import {Link} from 'react-router-dom'
import Router225 from '../../img/Router225.png'
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
        <button className={styles.button1}>Sensores <MdOutlineSensors /></button>
        </Link>

        <Link to="/homeCamera">
        <button className={styles.button2}>Camera <AiFillCamera /></button>
        </Link>

        <Link to="/homeNivelAgua">
        <button className={styles.button2}>Nivel agua <FaWater /></button>
        </Link>

        <Link to="/homeLeds">
        <button className={styles.button2}>Leds <MdLightMode /></button>
        </Link>       
        </div>
        
        <div className={styles.img}> 
         <img src={Router225} alt="Router" width='450px' height='450px' /> 
        </div>
        </section>
    )
}

export default Home