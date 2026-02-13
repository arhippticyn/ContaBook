import { FcGoogle } from 'react-icons/fc';
import styles from '../styles/Login.module.css';

const GoogleLogin = () => {
  return (
    <button
      className={styles.loginBtn}
      onClick={() => (window.location.href = 'https://contabook.onrender.com/auth/google')}
    >
      Log In with Google <FcGoogle className={styles.loginBtnImg} />
    </button>
  );
};

export default GoogleLogin;
