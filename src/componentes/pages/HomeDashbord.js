import style from './HomeDashbord.module.css'
import ListaSensores from '../Modal/ListaSensores'
import { useState } from 'react'

// Importando diretamente o array de sensores
const sensoresDaRouter = [  
    'Sensor X avançado', 'Sensor X recuado', 'Sensor Y avançado',
    'Sensor Y recuado', 'Sensor Z recuado', 'Sensor Home Y',
    'Sensor Home Z', 'Sensor Home X' 
]

function Dashbord() {
    const [openList, setOpenList] = useState(true)
    
    return (
        
          
                <ListaSensores 
                    itens={sensoresDaRouter} 
                    isOpenLS={openList} 
                    setOpenList={setOpenList} 
                    className={style.listaDashbord}
                />
        
    )
}

export default Dashbord
