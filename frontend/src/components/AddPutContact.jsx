import { AddContacnts } from '../redux/operation';
import { selectErrorContact } from '../redux/selectors';
import styles from '../styles/Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
const AddPutContact = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectErrorContact);

  const handleContacts = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value;
    const phone = form.elements.phone.value;
    const email = form.elements.email.value;
    dispatch(
      AddContacnts({
        first_name: firstName,
        last_name: lastName,
        phone: String(phone),
        email: email
      })
    );
    form.reset()
  };

  return (
    <div className={styles.AddPutContact}>
      <h2 className={styles.title}>Add Contact</h2>

      <form action="" className={styles.form} onSubmit={handleContacts}>
        <label htmlFor="firstName" className={styles.label}>
          Enter first name:
        </label>
        <input type="text" name="firstName" className={styles.input} />
        <label htmlFor="lastName" className={styles.label}>
          Enter last name:
        </label>
        <input type="text" name="lastName" className={styles.input} />
        <label htmlFor="phone" className={styles.label}>
          Enter phone:
        </label>
        <input type="tel" name="phone" id="" className={styles.input} />
        <label htmlFor="email" className={styles.label}>
          Enter email:
        </label>
        <input type="email" name="email" id="" className={styles.input} />

        <button className={styles.btn}>Add Contact</button>
      </form>

      {isError && (
        <div style={{ marginTop: '10px', fontFamily: 'Montserrat' }}>
          {isError}
        </div>
      )}
    </div>
  );
};

export default AddPutContact;
