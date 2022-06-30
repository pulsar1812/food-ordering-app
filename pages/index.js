import Head from 'next/head';
import axios from 'axios';

import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import styles from '../styles/Home.module.css';

export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name='description' content='Best Pizza Shop in Hong Kong' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`http://localhost:3000/api/products`);

  console.log(res.data);

  return {
    props: {
      pizzaList: res.data,
    },
  };
}
