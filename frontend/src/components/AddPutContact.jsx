import { useGenerateGradient } from '../hooks/gradient';
import { selectContact, SelectPage } from '../redux/ContactSlice';
import { AddContacnts, ContactEdit } from '../redux/operation';
import { selectCurrentContact, selectErrorContact, selectSelectedId } from '../redux/selectors';
import styles from '../styles/Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
const AddPutContact = () => {
  const dispatch = useDispatch();
  const isError = useSelector(selectErrorContact);
  const contactId = useSelector(selectSelectedId)
  const contact = useSelector(selectCurrentContact)
  const gradient = useGenerateGradient(contact?.id ?? 'add')


  const handleContacts = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value;
    const phone = form.elements.phone.value;
    const email = form.elements.email.value;
    if(contactId) {
      dispatch(ContactEdit({id: contactId, new_full_name: `${firstName} ${lastName}`, new_phone: phone, new_email: email}))
    } else {
    dispatch(
      AddContacnts({
        first_name: firstName,
        last_name: lastName,
        phone: String(phone),
        email: email
      })
    );}
    if (!contactId) {
      form.reset();
    }
  };

  return (
    <div className={styles.AddPutContact}>
      <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}><h2 className={styles.title}>{contactId ? 'Edit Contact' : 'Add Contact'}</h2>
      <button className={styles.btnSelect} style={{background: gradient}} onClick={() => dispatch(SelectPage())}>My contact</button></div>

      <form key={contactId || 'add'} action="" className={styles.form} onSubmit={handleContacts}>
        <label htmlFor="firstName" className={styles.label}>
          Enter first name:
        </label>
        <input type="text" name="firstName" className={styles.input} defaultValue={contact?.first_name || ''} />
        <label htmlFor="lastName" className={styles.label}>
          Enter last name:
        </label>
        <input type="text" name="lastName" className={styles.input} defaultValue={contact?.last_name || ''}/>
        <label htmlFor="phone" className={styles.label}>
          Enter phone:
        </label>
        <input type="tel" name="phone" id="" className={styles.input} defaultValue={contact?.phone || ''} />
        <label htmlFor="email" className={styles.label}>
          Enter email:
        </label>
        <input type="email" name="email" id="" className={styles.input} defaultValue={contact?.email || ''} />

        <button type="submit" className={styles.btn}>{contactId ? 'Edit contact' : 'Add Contact'}</button>
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
