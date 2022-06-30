import Image from 'next/image';
import styles from '../styles/PizzaCard.module.css';

export default function PizzaCard({ pizza }) {
  return (
    <div className={styles.container}>
      <Image src='/images/pizza.png' alt='' width={500} height={500} />
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>{pizza.prices[0]}</span>
      <p className={styles.description}>{pizza.description}</p>
    </div>
  );
}
