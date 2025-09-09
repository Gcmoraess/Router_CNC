import style from './ModalEfeitos.module.css'

function Efeitos ({isOpen2, setModal}) {

    const sendCommand = async (effect) => {
    try {
      const response = await fetch('http://localhost:5000/api/led', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ effect }),
      });
      if (!response.ok) throw new Error('Network error');
      console.log(`Comando enviado: ${effect}`);
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
    }
  };

    if (isOpen2) {

        return (
        <div className={style.background}>
        <div className={style.modal}>
        <h1>Escolha o efeito:</h1>

        <div className={style.colorGrid}>
            <button className={style.vermelho} onClick={() => sendCommand('Cyron')}>Cyron</button>  
            <button className={style.verde} onClick={() => sendCommand('Led Race')}>Led Race</button>
            <button className={style.amarelo} onClick={() => sendCommand('Duo cyron')}>Duo cyron</button>
            <button className={style.ciano} onClick={() => sendCommand('RGB')}>RGB</button>
            <button className={style.roxo} onClick={() => sendCommand('Fade')}>Fade</button>
            <button className={style.azul} onClick={() => sendCommand('Fade alternating')}>Fade alternating</button>
        </div>

        <button className={style.closeButton} onClick={() => setModal(false)}> Fechar </button>
      </div>
    </div>
        )
    }
     
}

export default Efeitos