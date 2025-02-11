import logo from './logo.svg';
import './App.css';
import To_do from './components/To_do';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<To_do />}></Route>
        </Routes>
      </Router>
    
      
      

    </div>
  );
}

export default App;
