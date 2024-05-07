import { Routes, Route } from 'react-router-dom';
import React, { Suspense, useEffect, useState, lazy } from 'react';
import UserNavbar from './layout/navbar/UserNavbar';
import './App.css';
import SpinLoading from './components/spin/Spin';
import ToastNotification from './components/toast/ToastNotification';
import UpdateRoom from './pages/Room/UpdateRoom';
import ManagerOwner from './pages/HomeAdmin/ManageOwner/ManageOwner';
import PublicElement from './components/commonAuth/PublicElement';
import HotelOwnerElement from './components/commonAuth/HotelOwnerElement';
import AdminElement from './components/commonAuth/AdminElement';
const Home = lazy(() => import('./pages/Home'));
const Details = lazy(() => import('./pages/Room/Details'));
const ListSearchMap = lazy(() => import('./pages/List/ListSearchMap'));
const AccountSetting = lazy(() => import('./pages/Setting/AccountSetting'));
const UpdateProfile = lazy(() => import('./pages/Setting/UpdateProfile'));
const HomeAdmin = lazy(() => import('./pages/HomeAdmin/HomeAdmin'));
const OwnerPage = lazy(() => import('./pages/HomeOwner/OwnerPage'));
const CheckoutOrder = lazy(() => import('./pages/Orders/CheckoutOrder'));
const ListOrder = lazy(() => import('./pages/Orders/ListOrder'));
const CreateRoom = lazy(() => import('./pages/Room/CreateRoom'));
const Dashboard = lazy(() => import('./pages/HomeAdmin/Dashboard/Dashboard'));
const ForgetPassword = lazy(() => import('./components/modals/ForgetPassword'));
const LoginModal = lazy(() => import('./components/modals/LoginModal'));
const RegisterModal = lazy(() => import('./components/modals/RegisterModal'));
const Security = lazy(() => import('./pages/Setting/ChangePassword'));
const ManageCategories = lazy(() => import('./pages/HomeAdmin/ManageCategories/ManageCategory'));
const ManagerUser = lazy(() => import('./pages/HomeAdmin/ManageUser/ManageUser'));
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
        <div className={currentPath[1] === "admin" ? '' : ' max-md:h-14 md:h-16 relative '} style={{ padding: '0px', margin: '0px' }}>
          <div className={currentPath[1] === "admin" ? '' : 'fixed top-0 w-full z-50'}>
            <UserNavbar />
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
        <ToastNotification />
        <Routes>
          <Route
            path="/"
            element={
              <PublicElement>
                <Home />
              </PublicElement>
            }
          />
          <Route
            path="/owner"
            element={
              <HotelOwnerElement>
                <OwnerPage />
              </HotelOwnerElement>
            }
          />
          <Route
            path="/details/:id"
            element={
              <PublicElement>
                <Details />
              </PublicElement>
            }
          />
          <Route
            path="/list"
            element={
              <PublicElement>
                <ListSearchMap />
              </PublicElement>
            }
          />
          <Route
            path="/createRoom"
            element={
              <HotelOwnerElement>
                <CreateRoom />
              </HotelOwnerElement>
            }
          />
          <Route
            path="/editRoom/:id"
            element={
              <HotelOwnerElement>
                <UpdateRoom />
              </HotelOwnerElement>
            }
          />
          <Route
            path="/order/:id"
            element={
              <PublicElement>
                <CheckoutOrder />
              </PublicElement>
            }
          />
          <Route
            path="/orders"
            element={
              <PublicElement>
                <ListOrder />
              </PublicElement>
            }
          />

          <Route path='account-setting' >
            <Route
              path=""
              element={
                <PublicElement>
                  <AccountSetting />
                </PublicElement>
              }
            />
            <Route
              path="personal-info"
              element={
                <PublicElement>
                  <UpdateProfile />
                </PublicElement>
              }
            />
            <Route
              path="secutiry"
              element={
                <PublicElement>
                  <Security />
                </PublicElement>
              }
            />
            <Route
              path="contract"
              element={
                <PublicElement>
                  <ContractPage />
                </PublicElement>
              }
            />

            <Route
              path="profile"
              element={
                <PublicElement>
                  <ProfilePage />
                </PublicElement>
              }
            />
          </Route>
          <Route path='admin' element={<HomeAdmin />} >
            <Route
              index path=""
              element={
                <AdminElement>
                  <Dashboard />
                </AdminElement>
              }
            />
            <Route
              path="categories"
              element={
                <AdminElement>
                  <ManageCategories />
                </AdminElement>
              }
            />
            <Route
              path="users"
              element={
                <AdminElement>
                  <ManagerUser />
                </AdminElement>
              }
            />
            <Route
              path="owner"
              element={
                <AdminElement>
                  <ManagerOwner />
                </AdminElement>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
