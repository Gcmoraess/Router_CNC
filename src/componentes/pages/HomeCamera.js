import style from './HomeCamera.module.css'
import img_camera from '../../img/img_camera.jpg'

function Camera () {
    return (
        <div className={style.container}>
            
           <img 
             src={img_camera} 
             alt="Camera" 
             width="350px" 
             height="450px" 
             style={{ border: "3px solid #000", borderRadius: "25px" }}
           />
        </div>
    )
}

export default Camera