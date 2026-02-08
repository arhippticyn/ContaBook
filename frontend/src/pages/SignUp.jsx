import { RegisterUser } from '../redux/operation';
import { selectError } from '../redux/selectors';
import styles from '../styles/Signup.module.css';
import { useDispatch, useSelector } from 'react-redux'

const SignUp = () => {
  const dispatch = useDispatch()
  const isError = useSelector(selectError)

  const handleRegister = e => {
    e.preventDefault()
    const form = e.target
    const username = form.elements.username.value
    const email = form.elements.email.value
    const password = form.elements.password.value;
    dispatch(RegisterUser({username: username, email: email, password: password}))
    form.reset()
  }
  return (
    <div className={styles.SignUp}>
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
  );
};

export default SignUp;
