import style from './ModalLeds.module.css'

function ModalLeds ({ isOpen, setOpen }) {

   const sendCommand = async (color) => {
    try {
      const response = await fetch('http://localhost:5000/api/led', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ color }),
      });
      if (!response.ok) throw new Error('Network error');
      console.log(`Comando enviado: ${color}`);
    } catch (error) {
      console.error('Erro ao enviar comando:', error);
    }
  };

 if (isOpen) {
  return (
    <div className={style.background}>
      <div className={style.modal}>
        <h1>Escolha a cor do led:</h1>

        <div className={style.colorGrid}>
            <button className={style.vermelho} onClick={() => sendCommand('red')}>Vermelho</button>  
            <button className={style.verde} onClick={() => sendCommand('green')}>Verde</button>
            <button className={style.amarelo} onClick={() => sendCommand('yellow')}>Amarelo</button>
            <button className={style.ciano} onClick={() => sendCommand('cyan')}>Ciano</button>
            <button className={style.roxo} onClick={() => sendCommand('purple')}>Roxo</button>
            <button className={style.azul} onClick={() => sendCommand('blue')}>Azul</button>
        </div>

        <button className={style.closeButton} onClick={() => setOpen(false)}> Fechar </button>
      </div>
    </div>
     ) 
    }
    else {
     return null;
     }
}

export default ModalLeds
    
    