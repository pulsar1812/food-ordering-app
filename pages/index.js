import { useState } from 'react';
import Head from 'next/head';

import dbConnect from '../lib/dbConnect';
import Featured from '../components/Featured';
import PizzaList from '../components/PizzaList';
import AddButton from '../components/AddButton';
import Add from '../components/Add';
import styles from '../styles/Home.module.css';

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState();
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name='description' content='Best Pizza Shop in Hong Kong' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || '';

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  await dbConnect();

  const res = await fetch(`http://localhost:3000/api/products`);
  const data = await res.json();

  // console.log(data);

  return {
    props: {
      pizzaList: data,
      admin,
    },
  };
}
