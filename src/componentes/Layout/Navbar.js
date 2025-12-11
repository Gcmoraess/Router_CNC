import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'

import Container from './Container'
import logoSyntroBranco from '../../img/logoSyntroBranco.png'

function Navbar () {
    return (
    <nav className={styles.navbar}>   
    <Container> 

        <Link to="/" className={styles.imglogo}>
        <img src={logoSyntroBranco} alt="Logo da empresa" width="365px" height="100px"/>
        </Link>

        <ul className={styles.list}>
            <li className={styles.item}>
                <Link to="/">Home</Link>
            </li>
             <li className={styles.item}>
                <Link to="/NewProject">New Project</Link>
            </li>
             <li className={styles.item}>
                <Link to="/Company">Enterprise</Link>
            </li>
             <li className={styles.item}>
                <Link to="/Contact">Contact</Link>
            </li>
        </ul>
        
    </Container>
    </nav>
    )
}

export default Navbar