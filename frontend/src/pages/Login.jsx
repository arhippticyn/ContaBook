import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/Login.module.css'
import { LoginUser } from '../redux/operation'
import GoogleLogin from '../components/GoogleLogin'
import GithubLogin from '../components/GithubLogin'
import { selectError, selectIslogin } from '../redux/selectors'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const isError = useSelector(selectError)
  const [isToggle, setIsToggle] = useState(false)
  const isLogin = useSelector(selectIslogin)

  const handleLogin = e => {
    e.preventDefault()
    const form = e.target
    const username = form.elements.username.value
    const password = form.elements.password.value
    dispatch(LoginUser({ username: username, password: password }))
    form.reset()
  }
  return (
    <div className={styles.Login}>
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
      <h2 className={styles.title}>Login</h2>
      <form
        action="http://localhost:5173/profile"
        className={styles.form}
        onSubmit={handleLogin}
      >
        <label htmlFor="username" className={styles.label}>
          Enter username:
        </label>
        <input type="text" name="username" id="" className={styles.input} />
        <label htmlFor="password" className={styles.label}>
          Enter password:
        </label>
        <input type="password" name="password" id="" className={styles.input} />

        <button type="submit" className={styles.btn}>
          Log In
        </button>
      </form>

      <ul className={styles.BtnUl}>
        <li>
          <GoogleLogin />
        </li>
        <li className={styles.li}>
          <GithubLogin />
        </li>
      </ul>

      {isError && (
        <div style={{ marginTop: '10px', fontFamily: 'Montserrat' }}>
          {isError}
        </div>
      )}
    </div>
  )
}

export default Login
