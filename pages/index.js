import Head from 'next/head';

import dbConnect from '../lib/dbConnect';
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
  await dbConnect();

  const res = await fetch(`http://localhost:3000/api/products`);
  const data = await res.json();

  // console.log(data);

  return {
    props: {
      pizzaList: data,
    },
  };
}
