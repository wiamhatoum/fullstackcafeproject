import logo from './logo.svg';


import './App.css';
import NavBar from './components/NavBar';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import About from './pages/About';
import Home from './pages/Home';
import Footer from './components/Footer';
import Feedback from './pages/feedback';
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'; 

function App() {
  return (
    
     
      <div className="App">
      <Router>
        <NavBar /> 
        
        <Routes>
          <Route path ="/" exact Component={Home}/>
          <Route path ="/menu" exact Component={Menu}/>
          <Route path ="/about" exact Component={About}/>
          <Route path ="/contact" exact Component={Contact}/>
          <Route path ="/Feedback" exact Component={Feedback}/>
        </Routes>
       
        <Footer />
        </Router>     
    </div>

  
  );
}

export default App;
