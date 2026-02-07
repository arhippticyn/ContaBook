import { useDispatch } from 'react-redux';
import styles from '../styles/Login.module.css';
import { LoginUser } from '../redux/operation';
import GoogleLogin from '../components/GoogleLogin';
import GithubLogin from '../components/GithubLogin';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = e => {
    e.preventDefault()
    const form = e.target
    const username = form.elements.username.value
    const password = form.elements.password.value
    dispatch(LoginUser({username:username, password:password}))
    form.reset()
  }
  return (
    <div className={styles.Login}>
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

      <ul style={{listStyle: 'none', display: 'flex', columnGap: '10px'}}>
        <li><GoogleLogin /></li>
        <li className={styles.li}><GithubLogin /></li>
      </ul>
    </div>
  );
};

export default Login;
