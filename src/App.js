import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './componentes/pages/Home'
import Company from './componentes/pages/Company'
import Contact from './componentes/pages/Contact'
import NewProject from './componentes/pages/NewProject'

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
       <Route exact path= "/Company" element={<Company/>}/> 
       <Route exact path= "/Contact" element={<Contact/>}/> 
       <Route exact path= "/NewProject" element={<NewProject/>}/>    
     </Routes>
     </Container>

     <Footer/>
     </Router>
  );
}

export default App;
