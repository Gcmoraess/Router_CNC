import style from './SensoresEstrutura.module.css'

function SensoresEstrutura ({isOpen3, setOpenEstrutura, itens1}) {
    if (isOpen3) {
    return (
        <>
        <div className={style.container}>

        {
        itens1.map((itens1, index) => (
            <div key={index} className={style.sensores} >
                <span className={style.circulo}> </span>
                <p>{itens1}</p>
            </div>
        ))
        }
        <div>
            <button className={style.closeButton} onClick={() => setOpenEstrutura(false)}>Fechar</button>
        </div>
        </div>
        </>
    )
    }
    else {
        return null
    }
    
}

export default SensoresEstrutura