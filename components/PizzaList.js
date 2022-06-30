import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

export default function PizzaList() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The Best Pizza in Hong Kong</h1>
      <p className={styles.description}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
        soluta asperiores numquam illo, fuga deserunt maiores error hic
        perferendis est quia praesentium animi mollitia maxime dignissimos
        libero qui eius laboriosam.
      </p>
      <div className={styles.wrapper}>
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
      </div>
    </div>
  );
}
