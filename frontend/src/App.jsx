import { lazy, Suspense } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import styles from './styles/Home.module.css';
import { RotatingLines } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { selectIslogin } from './redux/selectors.js';

const HomePage = lazy(() => import('./pages/Home.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUp.jsx'));
const LoginPage = lazy(() => import('./pages/Login.jsx'));
const ProfilePage = lazy(() => import('./pages/Profile.jsx'));
const ContactsPage = lazy(() => import('./pages/Contacts.jsx'));

function App() {
  const isLogin = useSelector(selectIslogin)
  return (
    <div>
      <Suspense
        fallback={
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        }
      >
        <nav className={styles.nav}>
          <div className={styles.basicNav}>
            <NavLink className={styles.navItem} to="/">
              Home
            </NavLink>
            <NavLink className={styles.navItem} to="/register">
              Sign Up
            </NavLink>
            <NavLink className={styles.navItem} to="/login">
              Login
            </NavLink>
          </div>
          {isLogin && (
            <div className={styles.loginNav}>
              <NavLink className={styles.navItem} to="/profile">
                Profile
              </NavLink>
              <NavLink className={styles.navItem} to="/contacts">
                My Contacts
              </NavLink>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
