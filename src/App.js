import { Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './layout/navbar/Navbar';
import Details from './pages/Room/Details';
import ListPage from './pages/List/ListPage';
import { Suspense, useEffect, useState } from 'react';
import AccountSetting from './pages/Setting/AccountSetting';
import UpdateProfile from './pages/Setting/UpdateProfile';
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import OwnerPage from './pages/HomeOwner/OwnerPage';
import DetailsOrder from './pages/Orders/DetailsOrder';
import ListOrder from './pages/Orders/ListOrder';
import CreateRoom from './pages/Room/CreateRoom';
import './App.css';
import Dashboard from './pages/HomeAdmin/Dashboard/Dashboard';
import ForgetPassword from './components/modals/ForgetPassword';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Security from './pages/Setting/ChangePassword';
import ManageCategories from './pages/Categories/ManageCategory';
import ManagerUser from './pages/HomeAdmin/User/User';
import SpinLoading from './components/spin/Spin';
import ToastNotification from './components/toast/ToastNotification'
function App() {
  const currentPath = window.location.pathname.split('/');
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
      {currentPath[1] === "admin" ? (
        <>
        </>
      ) : (
        <div className={currentPath[1] === "admin" ? '' : ' max-md:h-14 md:h-16 relative '} style={{padding:'0px', margin:'0px'}}>
          <div className={currentPath[1] === "admin" ? '' : 'fixed top-0 w-full z-50'}>
            <Navbar />
          </div>
        </div>
      )}
      <div className="">

        <Suspense fallback={
          <>
            <SpinLoading />
          </>
        }>
          <ForgetPassword />
          <LoginModal />
          <RegisterModal />
          <ToastNotification/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/owner' element={<OwnerPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/list' element={<ListPage />} />
            <Route path='/createRoom' element={<CreateRoom />} />
            <Route path='/editRoom/:id' element={<CreateRoom />} />
            <Route path='/order/:id' element={<DetailsOrder />} />
            <Route path='/orders' element={<ListOrder />} />

            <Route path='account-setting' >
              <Route path='' element={<AccountSetting />} />
              <Route path='personal-info' element={<UpdateProfile />} />
              <Route path='secutiry' element={<Security />} />

            </Route>
            <Route path='admin' element={<HomeAdmin />} >
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='categories' element={<ManageCategories />} />
              <Route path='users' element={<ManagerUser />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      <div className={isSmallScreen ? '' : 'hidden'}>
        {/* <BottomNavigation /> */}
      </div>
    </>
  );
}

export default App;
