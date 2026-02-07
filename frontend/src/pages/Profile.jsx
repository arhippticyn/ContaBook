import { useEffect } from 'react';
import { selectToken, selectUser } from '../redux/selectors';
import styles from '../styles/Profile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser, setAuthHeaders } from '../redux/operation';
import { setToken } from '../redux/AuthSlice';

const Profile = () => {
  const user = useSelector(selectUser);
  const isToken = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token')
    if (token) {
      setAuthHeaders(token);
      dispatch(setToken(token));
      
    }
    dispatch(GetUser())
  }, [dispatch]);

  return (
    <div className={styles.Profile}>
      <h2 className={styles.title}>My profile</h2>

      <h3 className={styles.username}>Hello, {user.username}!</h3>
      <p className={styles.email}>Your email: {user.email}</p>
    </div>
  );
};

export default Profile;
