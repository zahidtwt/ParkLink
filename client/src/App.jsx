import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';

import { Spinner } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import BookingsByParking from './components/ParkListing/BookingsByParking';
import ParkListing from './components/ParkListing/ParkListing';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import InitialCheck from './components/authentication/login/initial';
import Login from './components/authentication/login/login';
import Recovery from './components/authentication/login/recovery';
import Reset from './components/authentication/login/reset';
import Profile from './components/authentication/profile/profile';
import GetOTP from './components/authentication/signup/getotp';
import Signup from './components/authentication/signup/signup';
import AllBookings from './components/bookings/AllBookings';
import Bookmarks from './components/bookmarks/Bookmarks';
import MobileBottomNavbar from './components/common/mobileNav';
import PageNotFound from './components/common/pageNotFound';
import Dashboard from './components/dashboard/Dashboard';
import MainPage from './components/homepage/MainPage';
import ParkingForm from './components/parking/ParkingForm/ParkingForm/ParkingForm';
import SuccessParkingSubmission from './components/parking/ParkingForm/ParkingForm/SuccessParkingSubmission';
import BookParking from './components/parking/booking/BookParking';
import BookingSuccess from './components/parking/booking/BookingSuccess';
import SplashScreenLocationError from './components/splash/splashScreenLocationError';
import SplashScreenOne from './components/splash/splashScreenOne';
import SplashScreenThree from './components/splash/splashScreenThree';
import SplashScreenTwo from './components/splash/splashScreenTwo';
import SupportUsForm from './components/support/Support';
import useAuthCheck from './hooks/useAuthCheck';
function App() {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const authChecked = useAuthCheck();
  const refresh = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('Refresh completed successfully!');
        resolve(); // <-- call resolve() to indicate that the refresh is completed successfully
      }, 1000); // <-- simulate a delay of 2 seconds
    });
  };

  useEffect(() => {
    const cookieLocation = Cookies.get('location');
    if (cookieLocation) return setLocationAllowed(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        Cookies.set(
          'location',
          JSON.stringify({
            location: { latitude, longitude },
          }),
          { expires: 1 } // 1 day
        );
        setLocationAllowed(true);
        document.location = '/';
      },
      (error) => {
        console.error(error);
        setLocationError(true);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  if (locationError) return <SplashScreenLocationError />;

  if (!locationAllowed)
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner size={'xl'}></Spinner>
      </div>
    );

  return !authChecked ? (
    <Spinner size={'xl'}></Spinner>
  ) : (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Navigate to="/welcome" />
              </PublicRoute>
            }
          />
          <Route path="/welcome" element={<SplashScreenOne />} />
          <Route path="/splashtwo" element={<SplashScreenTwo />} />
          <Route path="/splashthree" element={<SplashScreenThree />} />
          <Route
            path="/login/"
            element={
              <PublicRoute>
                <InitialCheck />
              </PublicRoute>
            }
          ></Route>
          <Route path="/login/pass" element={<Login />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otpverification" element={<GetOTP />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <PullToRefresh onRefresh={refresh}>
                  <Profile />
                </PullToRefresh>
              </PrivateRoute>
            }
          />
          <Route
            path="/book-parking"
            element={
              <PrivateRoute>
                <BookParking />
              </PrivateRoute>
            }
          />

          <Route
            path="/mybookings"
            element={
              <PrivateRoute>
                <AllBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <Bookmarks />
              </PrivateRoute>
            }
          />
          <Route path="/support" element={<SupportUsForm />} />
          <Route
            path="/myparklistings"
            element={
              <PrivateRoute>
                <ParkListing />
              </PrivateRoute>
            }
          />
          <Route
            path="/myparklistings/bookings"
            element={
              <PrivateRoute>
                <BookingsByParking />
              </PrivateRoute>
            }
          />
          <Route
            path="/listparking"
            element={
              <PrivateRoute>
                <ParkingForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/main"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/listparking/success"
            element={<SuccessParkingSubmission />}
          />
          <Route path="/book-parking/success" element={<BookingSuccess />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <MobileBottomNavbar />
      </Router>
    </>
  );
}

export default App;
