import { useMemo } from 'react';
import styles from '../styles/Contacts.module.css';
import { UseGenerateGradient } from '../hooks/gradient';

const ContactCard = ({ contact }) => {

  return (
    <li
      className={styles.contactItem}
      style={{
        background: UseGenerateGradient(contact.id),
      }}
    >
      <h3 className={styles.contactTitle}>
        {contact.first_name} {contact.last_name}
      </h3>
      <a href={`tel:${contact.phone}`} className={styles.contactPhone}>
        {contact.phone}
      </a>
      <a href={`mailto:${contact.email}`} className={styles.contactEmail}>
        {contact.email}
      </a>
    </li>
  );
};

export default ContactCard; 
