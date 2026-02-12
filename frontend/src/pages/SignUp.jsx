import { useState } from 'react'
import { RegisterUser } from '../redux/operation'
import { selectError, selectIslogin } from '../redux/selectors'
import styles from '../styles/Signup.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdClose } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useDispatch()
  const isError = useSelector(selectError)
  const [isToggle, setIsToggle] = useState(false)
  const isLogin = useSelector(selectIslogin)

  const handleRegister = e => {
    e.preventDefault()
    const form = e.target
    const username = form.elements.username.value
    const email = form.elements.email.value
    const password = form.elements.password.value
    dispatch(
      RegisterUser({ username: username, email: email, password: password })
    )
    form.reset()
  }
  return (
    <div className={styles.SignUp}>
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
      <h2 className={styles.title}>SignUp</h2>

      <form action="" className={styles.form} onSubmit={handleRegister}>
        <label htmlFor="username" className={styles.label}>
          Enter username:
        </label>
        <input type="text" name="username" id="" className={styles.input} />
        <label htmlFor="email" className={styles.label}>
          Enter email:
        </label>
        <input type="email" name="email" id="" className={styles.input} />
        <label htmlFor="password" className={styles.label}>
          Enter password:
        </label>
        <input type="password" name="password" id="" className={styles.input} />

        <button type="submit" className={styles.btn}>
          Sign Up
        </button>
      </form>

      {isError && (
        <div style={{ marginTop: '10px', fontFamily: 'Montserrat' }}>
          {isError}
        </div>
      )}
    </div>
  )
}

export default SignUp
