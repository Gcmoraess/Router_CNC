import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import Container from './Container'
import logoSyntroBranco from '../../img/logoSyntroBranco.png'

import { AiOutlineAreaChart } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
import { MdLightMode } from "react-icons/md";
import { MdOutlineSensors } from "react-icons/md";
import { LiaTemperatureHighSolid } from "react-icons/lia";

function Navbar () {

    const [navbarVisivel, setNavbarVisivel] = useState(true)

    return (
        <>

            {/* BOTÃO DA NAVBAR */}
            <button
                className={styles.botaoNavbar}
                onClick={() => setNavbarVisivel(!navbarVisivel)}
            >
                ☰
            </button>


            {/* NAVBAR */}
            {navbarVisivel && (
                <>
                    <nav className={styles.navbar}>

                        <Container className={styles.navbarContainer}>

                            <Link to="/" className={styles.imglogo}>
                                <img
                                    src={logoSyntroBranco}
                                    alt="Logo da empresa"
                                    width="290px"
                                    height="60px"
                                />
                            </Link>

                            <div className={styles.textoVersao}>
                                <h1>V3.5</h1>
                            </div>

                        </Container>

                    </nav>


                    {/* SUBNAV */}
                    <div className={styles.subnav}>

                        <Link to="/homeDashbord" className={styles.item}>
                            Dashbord
                            <AiOutlineAreaChart />
                        </Link>

                        <Link to="/homeCamera" className={styles.item}>
                            Camera
                            <AiFillCamera />
                        </Link>

                        <Link to="/homeLeds" className={styles.item}>
                            Leds
                            <MdLightMode />
                        </Link>

                        <Link to="/homeTemperature" className={styles.item}>
                            Temperature
                            <LiaTemperatureHighSolid />
                        </Link>

                        <Link to="/homeSensores" className={styles.item}>
                            Sensors
                            <MdOutlineSensors />
                        </Link>

                    </div>
                </>
            )}

        </>
    )
}

export default Navbar