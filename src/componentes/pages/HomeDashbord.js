import style from './HomeDashbord.module.css'
import ListaSensores from '../Modal/ListaSensores'
import HomeNivelAgua from './HomeNivelAgua'
import SensoresEstrutura from '../Modal/SensoresEstrutura'
import { useState } from 'react'


// Importando diretamente o array de sensores
const sensoresDaRouter = [  
    'Sensor X AV', 'Sensor X RC', 'Sensor Y AV',
    'Sensor Y RC', 'Sensor Z RC', 'Sensor Home Y',
    'Sensor Home Z', 'Sensor Home X' 
]

const sensoresEstrutura = [  
    'Sensor Porta', 'Sensor nivel de Agua' 
]

function Dashbord() {
    const [openList, setOpenList] = useState(true)
    const [openEstr, setOpenEstrutura] = useState(true)
    
    return (
       <div className={style.container}>

     <ListaSensores 
        itens={sensoresDaRouter} 
        isOpenLS={openList} 
        setOpenList={setOpenList} 
        className={style.listaDashbord}
     />

        <HomeNivelAgua className={style.homeNivelAgua} />
        
     <SensoresEstrutura
        itens1={sensoresEstrutura} 
        isOpen3={openEstr} 
        setOpenEstrutura={setOpenEstrutura} 
        className={style.listaDashbord2}
     />

    </div>
            
    )
}

export default Dashbord
