    import { IoIosColorPalette } from "react-icons/io";
    import { BsController } from "react-icons/bs";  
    import { FaPowerOff } from "react-icons/fa";
    import { useState } from 'react';

    import styles from './HomeLeds.module.css'
    import ModalLeds from '../Modal/ModalLeds';


    function HomeLeds() {
    const [open, setOpen] = useState(false);
    const [setado, setSetado] = useState(false);

    const mudarEstadoOnOff = () => {
        setSetado(on => !on);
    }

    if (setado) {
        console.log('Leds ligados')
    }
    else {
        console.log('Leds desligados')
    }

        return (

            <div className={styles.container_homeLeds}>
        
                    <button className={styles.buttons} onClick={() => setOpen(!open)}>Cores <IoIosColorPalette /></button>
                    <ModalLeds isOpen={open} setOpen={setOpen}/>
            
                    <button className={styles.buttons}>Efeitos <BsController /></button>
            
                    <button  className={`${styles.buttons} ${setado ? styles.setado : ''}`} onClick={mudarEstadoOnOff}>
                   ON/OFF <FaPowerOff /></button>
            
            </div>
        )
    }

    export default HomeLeds