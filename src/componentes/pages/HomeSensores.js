import { useState } from 'react'
import style from './HomeSensores.module.css'
import ListaSensores from '../Modal/ListaSensores'
import SensoresEstrutura from '../Modal/SensoresEstrutura'

function HomeSensores () {

const [painelSensor, setPainelSensor] = useState ('Router sensors')

    return (
        
    <div className={style.container}>

        <div className={style.botoes}>

            <button className={style.button}
                onClick={() => setPainelSensor('Router sensors')} >
                    Router sensors
            </button>

            <button className={style.button} 
                onClick={() => setPainelSensor('Structure sensors')}>
                    Structure sensors
            </button>

        </div>

            <div className={style.painelSensor}>

                {painelSensor === 'Router sensors' &&
                    <ListaSensores />
                }

                {painelSensor === 'Structure sensors' &&
                    <SensoresEstrutura />
                }
            </div>
     </div>
    )
}

export default HomeSensores