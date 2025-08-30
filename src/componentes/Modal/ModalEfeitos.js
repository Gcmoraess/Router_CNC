import style from './ModalEfeitos.module.css'

function Efeitos ({isOpen2, setModal}) {

    if (isOpen2) {

        return (
        <div className={style.background}>
        <div className={style.modal}>
        <h1>Escolha o efeito:</h1>

        <div className={style.colorGrid}>
            <button className={style.vermelho} onClick={() => console.log('Cyron')}>Cyron</button>  
            <button className={style.verde} onClick={() => console.log('Led Race')}>Led Race</button>
            <button className={style.amarelo} onClick={() => console.log('Duo cyron')}>Duo cyron</button>
            <button className={style.ciano} onClick={() => console.log('RGB')}>RGB</button>
            <button className={style.roxo} onClick={() => console.log('Fade')}>Fade</button>
            <button className={style.azul} onClick={() => console.log('Alternating breathing')}>Alternating breathing</button>
        </div>

        <button className={style.closeButton} onClick={() => setModal(false)}> Fechar </button>
      </div>
    </div>
        )
    }
     
}

export default Efeitos