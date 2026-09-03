import styles from './Home.module.css'

function Home() {
    return (
        <div className={styles.home}>

            <video
                className={styles.backgroundVideo}
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/video_fundo.mp4" type="video/mp4" />
            </video>

            <video
                className={styles.routerVideo}
                autoPlay
                loop
                muted
                playsInline
            >
                <source
                    src="/Router_sem_fundo_CORRETO.webm"
                    type="video/webm"
                />
            </video>

        </div>
    )
}

export default Home