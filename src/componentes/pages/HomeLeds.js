import { IoIosColorPalette } from "react-icons/io";
import { BsController } from "react-icons/bs";  
import { FaPowerOff } from "react-icons/fa";
import { useState, useEffect } from 'react';

import styles from './HomeLeds.module.css';
import ModalLeds from '../Modal/ModalLeds';
import ModalEfeitos from '../Modal/ModalEfeitos';

function HomeLeds() {
  const [painel, setPainel] = useState('colors');
  const [LedsOn, setLedsOn] = useState(false);
  

  // ⬇️ Carrega o estado salvo quando a página abrir
  useEffect(() => {
    const savedState = localStorage.getItem('estadoLeds');

    if (savedState === 'ON') {
      setLedsOn(true);
    } else if (savedState === 'OFF') {
      setLedsOn(false);
    }
  }, []);

  const sendCommand = async (LedsOnOff) => {
    try {
      const response = await fetch('http://localhost:5000/api/led', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color: LedsOnOff }),
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

      // ⬇️ salva no localStorage
      localStorage.setItem('estadoLeds', next ? 'ON' : 'OFF');

      // envia comando
      sendCommand(next ? 'ON' : 'OFF');

      console.log(next ? 'Leds ON' : 'Leds OFF');
      return next;
    });
  };

  return (
    <div className={styles.container_homeLeds}>

      <div className={styles.botoes}>

      <button className={styles.buttons}
        onClick={() => setPainel('colors')}>
        Colors <IoIosColorPalette />
      </button>

      <button className={styles.buttons}
        onClick={() => setPainel('effects')}>
        Effects <BsController />
      </button>

      <button  
        className={`${styles.buttons} ${LedsOn ? styles.LedsOn : ''}`} 
        onClick={mudarEstadoOnOff}
      >
        {LedsOn ? 'ON' : 'OFF'} <FaPowerOff />
      </button>

      </div>

      <div className={styles.painel}>
          {painel === 'colors' && <ModalLeds />}
          {painel === 'effects' && <ModalEfeitos />}
      </div>

    </div>

  );
}

export default HomeLeds;
