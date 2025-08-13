import style from './ModalModoEscuro.module.css'

function ModalModoEscuro({isOpen, setOpen}) {

    if (isOpen) {
    return (
        
        <div className={style.background}>
        <div className={style.modal}>
         <h1>Sensores: </h1>

        <div className={style.container_buttons}>
            <button className={style.ativado} onClick={() => console.log('Sensores ativados')}>Ligado</button>
            <button className={style.desativado} onClick={() => console.log('Sensores desativados')}>Desligado</button>
         </div>
         <div>
            <button className={style.closeButton} onClick={() => setOpen(false)}>Fechar</button>
          </div>
         </div>
        </div>
    )
    }

    else {
        return null
    }
}

export default ModalModoEscuro