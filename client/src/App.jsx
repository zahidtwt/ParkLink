import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import SplashScreenOne from './components/splash/splashScreenOne';
import SplashScreenTwo from './components/splash/splashScreenTwo';
import SplashScreenThree from './components/splash/splashScreenThree';
import InitialCheck from './components/authentication/login/initial';
import Login from './components/authentication/login/login';
import Signup from './components/authentication/signup/signup';
import GetOTP from './components/authentication/signup/getotp';
import PageNotFound from './components/common/pageNotFound';
import Recovery from './components/authentication/login/recovery';
import Reset from './components/authentication/login/reset';
import Profile from './components/authentication/profile/profile';
import useAuthCheck from './hooks/useAuthCheck';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import MobileBottomNavbar from './components/common/mobileNav';
import Dashboard from './components/dashboard/Dashboard';
import BookParking from './components/parking/booking/BookParking';
import ParkingForm from './components/parking/ParkingForm/ParkingForm';
function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <PublicRoute>
                <Navigate to='/welcome' />
              </PublicRoute>
            }
          />
          <Route path='/welcome' element={<SplashScreenOne />} />
          <Route path='/splashtwo' element={<SplashScreenTwo />} />
          <Route path='/splashthree' element={<SplashScreenThree />} />
          <Route
            path='/login/'
            element={
              <PublicRoute>
                <InitialCheck />
              </PublicRoute>
            }></Route>
          <Route path='/login/pass' element={<Login />} />
          <Route path='/recovery' element={<Recovery />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/otpverification' element={<GetOTP />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/booking'
            element={
              <PrivateRoute>
                <BookParking />
              </PrivateRoute>
            }
          />
          <Route
            path='/listparking'
            element={
              <PrivateRoute>
                <ParkingForm />
              </PrivateRoute>
            }
          />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <MobileBottomNavbar />
      </Router>
    </>
  );
}

export default App;
