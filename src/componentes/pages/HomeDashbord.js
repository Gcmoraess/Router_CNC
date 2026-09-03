import style from './HomeDashbord.module.css'
import { useState } from 'react'
import ListaSensores from '../Modal/ListaSensores'
import HomeNivelAgua from './HomeNivelAgua'
import SensoresEstrutura from '../Modal/SensoresEstrutura'
import HomeCamera from './HomeCamera'
import HomeTemperature from './HomeTemperature'


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

    <div className={style.homeNivelAgua_Dashbord}>
        <HomeNivelAgua  />
    </div>

    <div className={style.homeCamera_Dashbord}>
        <HomeCamera  />
    </div>

    <div className={style.homeTemperature_DashBord}>
        <HomeTemperature />
    </div>

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
