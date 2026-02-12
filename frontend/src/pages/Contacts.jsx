import { useSelector } from 'react-redux'
import AddPutContact from '../components/AddPutContact'
import ContactList from '../components/ContactList'
import { selectAddPutPage, selectIslogin } from '../redux/selectors'
import { useState } from 'react'
import styles from '../styles/Contacts.module.css'
import { IoMdClose } from 'react-icons/io'
import { RxHamburgerMenu } from 'react-icons/rx'
import { NavLink } from 'react-router-dom'

const Contacts = () => {
  const isAddPage = useSelector(selectAddPutPage)
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
      {isAddPage ? <AddPutContact /> : <ContactList />}
    </div>
  )
}

export default Contacts
