import style from './HomeDashbord.module.css'
import ListaSensores from '../Modal/ListaSensores'
import HomeNivelAgua from './HomeNivelAgua'
import SensoresEstrutura from '../Modal/SensoresEstrutura'
import { useState } from 'react'
import HomeCamera from './HomeCamera'


// Importando diretamente o array de sensores
const sensoresDaRouter = [  
    'Sensor X AV', 'Sensor X RC', 'Sensor Y AV',
    'Sensor Y RC', 'Sensor Z RC', 'Home Y',
    'Home Z', 'Home X' 
]

const sensoresEstrutura = [  
    'Sensor Porta', 'Sensor nivel de Agua' 
]

function Dashbord() {
    const [openList, setOpenList] = useState(true)
    const [openEstr, setOpenEstrutura] = useState(true)
    
    return (
       <div className={style.container}>

    

     <HomeNivelAgua className={style.homeNivelAgua} />
        
     <HomeCamera/>

     <ListaSensores 
        itens={sensoresDaRouter} 
        isOpenLS={openList} 
        setOpenList={setOpenList} 
        className={style.listaDashbord}
     />

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
