    import { IoIosColorPalette } from "react-icons/io";
    import { BsController } from "react-icons/bs";  
    import { FaPowerOff } from "react-icons/fa";
    import { useState } from 'react';

    import styles from './HomeLeds.module.css'
    import ModalLeds from '../Modal/ModalLeds';
    import ModalEfeitos from '../Modal/ModalEfeitos'

    function HomeLeds() {
    const [open, setOpen] = useState(false);
    const [LedsOn, setLedsOn] = useState(false);
    const [openModal, setModal] = useState(false);

    const sendCommand = async (LedsOnOff) => {
    try {
      const response = await fetch('http://localhost:5000/api/led', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: LedsOnOff }), // muda para "color", que o Python espera
      });
      if (!response.ok) throw new Error('Network error');
      console.log(`Comando enviado: ${LedsOnOff}`);
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
    }
  };

  const mudarEstadoOnOff = () => {
    setLedsOn(prev => {
      const next = !prev;
      console.log(next ? 'Leds ON' : 'Leds OFF');

      // envia comando para a API
      sendCommand(next ? 'ON' : 'OFF');

      return next;
    });
  };
        return (

            <div className={styles.container_homeLeds}>
        
                    <button className={styles.buttons} onClick={() => setOpen(!open)}>Colors <IoIosColorPalette /></button>
                    <ModalLeds isOpen={open} setOpen={setOpen}/>
            
                    <button className={styles.buttons} onClick={() => setModal(!openModal)}>Effects <BsController /></button>
                    <ModalEfeitos isOpen2={openModal} setModal={setModal} /> 

                    <button  className={`${styles.buttons} ${LedsOn ? styles.LedsOn : ''}`} onClick={mudarEstadoOnOff}> 
                        {LedsOn ? 'ON' : 'OFF'} <FaPowerOff /></button>
            
            </div>
        )
    }

    export default HomeLeds