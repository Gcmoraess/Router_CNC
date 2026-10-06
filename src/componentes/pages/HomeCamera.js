import style from './HomeCamera.module.css'

function Camera() {
    return (
        <div className={style.container}>
            <img
                src="http://192.168.0.15:5000/camera/stream"
                alt="Camera Ao Vivo"
            />
        </div>
    )
}

export default Camera