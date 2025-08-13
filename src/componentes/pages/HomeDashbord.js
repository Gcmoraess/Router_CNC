import style from './HomeDashbord.module.css'
import NivelAgua from './HomeNivelAgua'

function Dashbord () {
    return (
        <div className={style.container}>
            <NivelAgua />
        </div>
    )
}

export default Dashbord