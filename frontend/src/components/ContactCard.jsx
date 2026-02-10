import { useMemo } from 'react';
import styles from '../styles/Contacts.module.css';
import { useGenerateGradient } from '../hooks/gradient';
import { TiEdit } from "react-icons/ti";
import { useDispatch } from 'react-redux'
import { selectContact } from '../redux/ContactSlice';

const ContactCard = ({ contact }) => {
  const dispatch = useDispatch()
  const gradient = useGenerateGradient(contact.id);
  return (
    <li
      className={styles.contactItem}
      style={{
        background:gradient,
      }}
    >
      <div style={{display: 'flex', flexDirection: 'column'}}>
              <h3 className={styles.contactTitle}>
        {contact.first_name} {contact.last_name}
      </h3>
      <a href={`tel:${contact.phone}`} className={styles.contactPhone}>
        {contact.phone}
      </a>
      <a href={`mailto:${contact.email}`} className={styles.contactEmail}>
        {contact.email}
      </a>
      </div>

      <div>
        <button className={styles.BtnEdit} style={{background: gradient}} onClick={() => dispatch(selectContact(contact.id))}><TiEdit /></button>
      </div>

    </li>
  );
};

export default ContactCard; 
