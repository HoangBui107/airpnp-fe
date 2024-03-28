import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './layout/navbar/Navbar';
import Details from './pages/Details/details';
import ListPage from './pages/list/ListPage';
import { useEffect, useState } from 'react';
import BottomNavigation from './layout/bottom/BottomNavigation';
import AccountSetting from './pages/account-setting/AccountSetting';
import PersonalInfo from './pages/account-setting/PersonalInfo';

function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsSmallScreen(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/details' element={<Details />} />
          <Route path='/list' element={<ListPage />} />
          <Route path='account-setting' >
              <Route path='' element={<AccountSetting />} />
              <Route path='personal-info' element={<PersonalInfo/>}/>
              
          </Route>
          

        </Routes>
      </div>
        {/* <div className={isSmallScreen ? '' : 'hidden'}>
          <BottomNavigation />
        </div> */}
    </>
  );
}

export default App;
