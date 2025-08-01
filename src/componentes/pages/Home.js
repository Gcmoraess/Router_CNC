import Router15 from '../../img/Router15.JPG'
import styles from './Home.module.css'

function Home () {
    return (
        <section className={styles.home_container}>
        <h1>Home</h1>
        <img src={Router15} alt="Router" /> 
        </section>
    )
}

export default Home