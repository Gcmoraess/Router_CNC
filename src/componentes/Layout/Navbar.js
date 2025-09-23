import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'

import Container from './Container'
import logo_teste from '../../img/logo_teste.png'

function Navbar () {
    return (
    <nav className={styles.navbar}>   
    <Container> 

        <Link to="/" className={styles.imglogo}>
        <img src={logo_teste} alt="CNC Router" width="340px" height="110px"/>
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