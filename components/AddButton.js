import styles from '../styles/AddButton.module.css';

export default function AddButton({ setClose }) {
  return (
    <div className={styles.addButton} onClick={() => setClose(false)}>
      Add New Pizza
    </div>
  );
}
