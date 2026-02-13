import { FaGithub } from 'react-icons/fa';
import styles from '../styles/Login.module.css';

const GithubLogin = () => {
  return (
    <button
      className={styles.loginBtn}
      onClick={() =>
        (window.location.href = 'https://contabook.onrender.com/auth/github')
      }
    >
      Log In with Github <FaGithub className={styles.loginBtnImg} />
    </button>
  );
};

export default GithubLogin;
