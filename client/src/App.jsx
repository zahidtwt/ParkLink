import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import PullToRefresh from 'react-simple-pull-to-refresh';
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
import ParkingForm from './components/parking/ParkingForm/ParkingForm/ParkingForm';
import SuccessParkingSubmission from './components/parking/ParkingForm/ParkingForm/SuccessParkingSubmission';
import BookingSuccess from './components/parking/booking/BookingSuccess';
import AllBookings from './components/bookings/AllBookings';
import { Spinner } from '@chakra-ui/react';
import ParkListing from './components/ParkListing/ParkListing';
import MainPage from './components/homepage/MainPage';
function App() {
  const authChecked = useAuthCheck();
  const refresh = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Refresh completed successfully!');
        resolve(); // <-- call resolve() to indicate that the refresh is completed successfully
      }, 1000); // <-- simulate a delay of 2 seconds
    });
  };
  return !authChecked ? (
    <Spinner size={'xl'}></Spinner>
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
                <PullToRefresh onRefresh={refresh}>
                  <Profile />
                </PullToRefresh>
              </PrivateRoute>
            }
          />
          <Route
            path='/book-parking'
            element={
              <PrivateRoute>
                <BookParking />
              </PrivateRoute>
            }
          />

          <Route
            path='/mybookings'
            element={
              <PrivateRoute>
                <AllBookings />
              </PrivateRoute>
            }
          />
          <Route
            path='/myparklistings'
            element={
              <PrivateRoute>
                <ParkListing />
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
          <Route
            path='/main'
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/listparking/success'
            element={<SuccessParkingSubmission />}
          />
          <Route path='/book-parking/success' element={<BookingSuccess />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <MobileBottomNavbar />
      </Router>
    </>
  );
}

export default App;
