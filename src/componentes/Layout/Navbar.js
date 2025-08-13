import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'

import Container from './Container'
import logoSyntro from '../../img/logoSyntro.png'

function Navbar () {
    return (
    <nav className={styles.navbar}>   
    <Container> 

<<<<<<< HEAD
        <Link to="/">
=======
        <Link to="/" className={styles.imglogo}>
>>>>>>> 0d2ab63 (segundo commit)
        <img src={logoSyntro} alt="CNC Router" width="100px" height="100px"/>
        </Link>

        <ul className={styles.list}>
            <li className={styles.item}>
                <Link to="/">Home</Link>
            </li>
             <li className={styles.item}>
                <Link to="/NewProject">Novo projeto</Link>
            </li>
             <li className={styles.item}>
                <Link to="/Company">Empresa</Link>
            </li>
             <li className={styles.item}>
                <Link to="/Contact">Contato</Link>
            </li>
        </ul>
        
    </Container>
    </nav>
    )
}

export default Navbar