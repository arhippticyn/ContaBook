import { useDispatch, useSelector } from "react-redux"
import { selectContacts } from "../redux/selectors"
import styles from '../styles/Contacts.module.css';
import { useEffect } from 'react';
import { GetContact } from "../redux/operation"
import ContactCard from "./ContactCard";
import { useGenerateGradient } from "../hooks/gradient";
import { selectAddPage } from "../redux/ContactSlice";

const ContactList = () => {
    const contacts = useSelector(selectContacts)
    const dispatch = useDispatch()
    const btnGradient = useGenerateGradient(999)

    useEffect(() => {
        dispatch(GetContact())
    }, [dispatch])
  return (
    <div className={styles.ContactList}>
      <div className={styles.contactInfo}>
        <h2 className={styles.ContactListTitle}>My Contact</h2>
        <button className={styles.btnAdd} onClick={() => dispatch(selectAddPage())} style={{background: btnGradient}}>Add +</button>
      </div>
      <ul className={styles.ContactListUl}>
        {contacts.filter(Boolean).map((contact) => {
          return <ContactCard key={contact.id} contact={contact} />;
        })}
      </ul>
    </div>
  );
}

export default ContactList