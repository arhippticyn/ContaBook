import { useState } from 'react'
import News from '../components/News'
import styles from '../styles/Home.module.css'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoMdClose } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import { selectIslogin } from '../redux/selectors'
import { useSelector } from 'react-redux'

const Home = () => {
  const [isToggle, setIsToggle] = useState(false)
  const isLogin = useSelector(selectIslogin)
  return (
    <div>
      <button
        className={styles.burgerBtn}
        onClick={() => setIsToggle(prev => !prev)}
      >
        {isToggle ? <IoMdClose /> : <RxHamburgerMenu />}
      </button>

      <div className={`${styles.mobileBurger} ${isToggle ? styles.open : ''}`}>
        <ul className={styles.mobileBurgerList}>
          <NavLink className={styles.navItem} to="/">
            Home
          </NavLink>
          <NavLink className={styles.navItem} to="/register">
            Sign Up
          </NavLink>
          <NavLink className={styles.navItem} to="/login">
            Login
          </NavLink>
          {isLogin && (
            <div className={`${styles.loginNav} ${styles.openNav}`}>
              <NavLink className={styles.navItem} to="/profile">
                Profile
              </NavLink>
              <NavLink className={styles.navItem} to="/contacts">
                My Contacts
              </NavLink>
            </div>
          )}
        </ul>
      </div>

      <News />
    </div>
  )
}

export default Home
