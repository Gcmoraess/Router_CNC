import style from './HomeDashbord.module.css'
import HomeNivelAgua from './HomeNivelAgua'
import HomeCamera from './HomeCamera'
import HomeTemperature from './HomeTemperature'


function Dashbord() {
    
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

       </div>
            
    )
}

export default Dashbord
