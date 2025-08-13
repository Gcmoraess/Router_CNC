import { useState } from 'react'
import style from './HomeSensores.module.css'
import ListaSensores from '../Layout/ListaSensores'
import SensoresEstrutura from '../Modal/SensoresEstrutura'

function HomeSensores () {

const sensoresDaRouter = [  
    'Sensor X avançado', 'Sensor X recuado', 'Sensor Y avançado',
    'Sensor Y recuado', 'Sensor Z recuado', 'Sensor Home Y',
    'Sensor Home Z', 'Sensor Home X' ]

const sensoresEstruturaRouter = [
    'Sensor Porta', 'Sensor nivel de Agua' 
]


const [OpenLS, setOpenList] = useState (false)
const [OpenEstrutura, setOpenEstrutura] = useState (false)

    return (
        
        <div className={style.container}>

            <button className={style.buttonSRouter} onClick={() => setOpenList(!OpenLS)} >Sensores da Router</button>
            <ListaSensores itens={sensoresDaRouter} isOpenLS={OpenLS} setOpenList={setOpenList}/>

            <button className={style.buttonEstrutura} onClick={() => setOpenEstrutura(!OpenEstrutura)}>Sensores da estrutura</button>
            <SensoresEstrutura itens1={sensoresEstruturaRouter} isOpen3={OpenEstrutura} setOpenEstrutura={setOpenEstrutura}/> 

        </div>
    )
}

export default HomeSensores