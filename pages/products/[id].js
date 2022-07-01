import { useState } from 'react';
import Image from 'next/image';

import dbConnect from '../../lib/dbConnect';
import styles from '../../styles/Product.module.css';

export default function Product({ pizza }) {
  const [size, setSize] = useState(0);

  // const pizza = {
  //   id: 1,
  //   image: '/images/pizza.png',
  //   name: 'CAMPAGNOLA',
  //   prices: [19.9, 23.9, 27.9],
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.',
  // };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.image} alt='' layout='fill' objectFit='contain' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.name}>{pizza.name}</h1>
        <span className={styles.price}>${pizza.prices[size]}</span>
        <p className={styles.description}>{pizza.description}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src='/images/size.png' alt='' layout='fill' />
            <span className={styles.label}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src='/images/size.png' alt='' layout='fill' />
            <span className={styles.label}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src='/images/size.png' alt='' layout='fill' />
            <span className={styles.label}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          <div className={styles.option}>
            <input
              type='checkbox'
              id='double'
              name='double'
              className={styles.checkbox}
            />
            <label htmlFor='double'>Double Ingredients</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type='checkbox'
              id='cheese'
              name='cheese'
            />
            <label htmlFor='cheese'>Extra Cheese</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type='checkbox'
              id='spicy'
              name='spicy'
            />
            <label htmlFor='spicy'>Spicy Sauce</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type='checkbox'
              id='garlic'
              name='garlic'
            />
            <label htmlFor='garlic'>Garlic Sauce</label>
          </div>
        </div>

        <div className={styles.add}>
          <input type='number' defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();

  const res = await fetch(`http://localhost:3000/api/products/${params.id}`);
  const data = await res.json();

  console.log(data);

  return {
    props: {
      pizza: data,
    },
  };
}
