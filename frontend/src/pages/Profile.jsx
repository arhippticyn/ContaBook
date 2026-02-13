import { useEffect, useState } from 'react'
import { selectIslogin, selectToken, selectUser } from '../redux/selectors'
import styles from '../styles/Profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { GetUser, setAuthHeaders } from '../redux/operation'
import { setToken } from '../redux/AuthSlice'
import { IoMdClose } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const Profile = () => {
  const user = useSelector(selectUser)
  const isToken = useSelector(selectToken)
  const dispatch = useDispatch()
  const [isToggle, setIsToggle] = useState(false)
  const isLogin = useSelector(selectIslogin)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      setAuthHeaders(token)
      dispatch(setToken(token))
    }
    dispatch(GetUser())
    window.history.replaceState({}, document.title, "/profile")
  }, [dispatch])

  return (
    <div className={styles.Profile}>
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
      <h2 className={styles.title}>My profile</h2>

      <h3 className={styles.username}>Hello, {user.username}!</h3>
      <p className={styles.email}>Your email: {user.email}</p>
    </div>
  )
}

export default Profile
