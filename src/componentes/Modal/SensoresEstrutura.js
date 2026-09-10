import style from './SensoresEstrutura.module.css'

const sensoresEstruturaRouter = 
[ 'Sensor Porta', 'Sensor nivel de Agua' ]

function SensoresEstrutura() {
    
    return (
        <>
        
        <div className={style.container}>

            {
            sensoresEstruturaRouter.map((itens1, index) => (

            <div key={index} className={style.sensores} >
                <span className={style.circulo}> </span>
                <p>{itens1}</p>
            </div>
            ))
            }
        </div>
        </>
    )
    }


export default SensoresEstrutura