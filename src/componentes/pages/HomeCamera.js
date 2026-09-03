import style from './HomeCamera.module.css'

function Camera () {
    return (
        <div className={style.container}>
            
           <img 
             src="http://192.168.0.15:5000/camera/stream"  // <- URL do seu Python
             alt="Camera Ao Vivo"
             width="650px"
             height="500px"
             style={{ 
                border: "3px solid #000", 
                borderRadius: "25px",
                objectFit: "cover"
             }}
           />
        </div>
    )
}

export default Camera
