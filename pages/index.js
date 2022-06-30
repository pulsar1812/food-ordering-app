import Head from 'next/head';

import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name='description' content='Best Pizza Shop in Hong Kong' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      <PizzaList />
    </div>
  );
}
