import { Routes, Route, useParams } from 'react-router-dom';
import React, { Suspense, useEffect, useState, lazy } from 'react';
import Navbar from './layout/navbar/Navbar';
import './App.css';
import SpinLoading from './components/spin/Spin';
import ToastNotification from './components/toast/ToastNotification';
import UpdateRoom from './pages/Room/UpdateRoom';
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Details = lazy(() => import('./pages/Room/Details'));
const ListPage = lazy(() => import('./pages/List/ListPage'));
const AccountSetting = lazy(() => import('./pages/Setting/AccountSetting'));
const UpdateProfile = lazy(() => import('./pages/Setting/UpdateProfile'));
const HomeAdmin = lazy(() => import('./pages/HomeAdmin/HomeAdmin'));
const OwnerPage = lazy(() => import('./pages/HomeOwner/OwnerPage'));
const DetailsOrder = lazy(() => import('./pages/Orders/DetailsOrder'));
const ListOrder = lazy(() => import('./pages/Orders/ListOrder'));
const CreateRoom = lazy(() => import('./pages/Room/CreateRoom'));
const Dashboard = lazy(() => import('./pages/HomeAdmin/Dashboard/Dashboard'));
const ForgetPassword = lazy(() => import('./components/modals/ForgetPassword'));
const LoginModal = lazy(() => import('./components/modals/LoginModal'));
const RegisterModal = lazy(() => import('./components/modals/RegisterModal'));
const Security = lazy(() => import('./pages/Setting/ChangePassword'));
const ManageCategories = lazy(() => import('./pages/Categories/ManageCategory'));
const ManagerUser = lazy(() => import('./pages/HomeAdmin/User/User'));
const ContractPage = lazy(() => import('./pages/Setting/ContractPage'));
const ProfilePage = lazy(() => import('./pages/Setting/Profile'));

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
            <Route path='/editRoom/:id' element={<UpdateRoom />} />
            <Route path='/order/:id' element={<DetailsOrder />} />
            <Route path='/orders' element={<ListOrder />} />

            <Route path='account-setting' >
              <Route path='' element={<AccountSetting />} />
              <Route path='personal-info' element={<UpdateProfile />} />
              <Route path='secutiry' element={<Security />} />
              <Route path='contract' element={<ContractPage />} />
              <Route path='profile' element={<ProfilePage />} />

            </Route>
            <Route path='admin' element={<HomeAdmin />} >
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='categories' element={<ManageCategories />} />
              <Route path='users' element={<ManagerUser />} />
            </Route>
          </Routes>
        </Suspense>
      
      <div className={isSmallScreen ? '' : 'hidden'}>
        {/* <BottomNavigation /> */}
      </div>
    </>
  );
}

export default App;
