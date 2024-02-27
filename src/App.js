import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './layout/navbar/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <div className="App">
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
      
      </Routes>
    </div>
    </>
  );
}

export default App;
