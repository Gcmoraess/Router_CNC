import { useState } from 'react'
import style from './HomeSensores.module.css'
import ListaSensores from '../Modal/ListaSensores'
import SensoresEstrutura from '../Modal/SensoresEstrutura'

function HomeSensores () {

const sensoresDaRouter = [  
    'Sensor X AV', 'Sensor X RC', 'Sensor Y AV',
    'Sensor Y RC', 'Sensor Z RC', 'Home Y',
    'Home Z', 'Home X' ]

const sensoresEstruturaRouter = [
    'Sensor Porta', 'Sensor nivel de Agua' 
]


const [OpenLS, setOpenList] = useState (false)
const [OpenEstrutura, setOpenEstrutura] = useState (false)

    return (
        
        <div className={style.container}>

            <button className={style.buttonSRouter} onClick={() => setOpenList(!OpenLS)} >Router sensors</button>
            <ListaSensores itens={sensoresDaRouter} isOpenLS={OpenLS} setOpenList={setOpenList}/>

            <button className={style.buttonEstrutura} onClick={() => setOpenEstrutura(!OpenEstrutura)}>Structure sensors</button>
            <SensoresEstrutura itens1={sensoresEstruturaRouter} isOpen3={OpenEstrutura} setOpenEstrutura={setOpenEstrutura}/> 

        </div>
    )
}

export default HomeSensores