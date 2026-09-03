import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './componentes/pages/Home'
import Company from './componentes/pages/Company'
import Contact from './componentes/pages/Contact'
import NewProject from './componentes/pages/NewProject'
import HomeLeds from './componentes/pages/HomeLeds'
import HomeSensores from './componentes/pages/HomeSensores'
import HomeNivelAgua from './componentes/pages/HomeNivelAgua'
import HomeDashbord from './componentes/pages/HomeDashbord'
import HomeCamera from './componentes/pages/HomeCamera'
import HomeTemperature from "./componentes/pages/HomeTemperature";

import Container from "./componentes/Layout/Container"
import Navbar from './componentes/Layout/Navbar'
import Footer from './componentes/Layout/Footer'


function App() {
  return (
    
    <Router>
    
    <Navbar />

     <Container className="min-height">
     <Routes>
       <Route exact path= "/" element={<Home/>}/> 
       <Route exact path= "/company" element={<Company/>}/> 
       <Route exact path= "/contact" element={<Contact/>}/> 
       <Route exact path= "/newProject" element={<NewProject/>}/>
       <Route exact path= "/homeLeds" element={<HomeLeds/>}/>
       <Route exact path= "/homeSensores" element={<HomeSensores/>}/>
       <Route exact path= "/homeNivelAgua" element={<HomeNivelAgua/>}/>
       <Route exact path= "/homeDashbord" element={<HomeDashbord/>}/>
       <Route exact path= "/homeCamera" element={<HomeCamera/>}/>
       <Route exact path= "/homeTemperature" element={<HomeTemperature/>}/>
     </Routes>
     </Container>

      

     <Footer/>
     </Router>
  );
}

export default App;
