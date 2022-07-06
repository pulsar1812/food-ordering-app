import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import dbConnect from '../../lib/dbConnect';
import { addProduct } from '../../redux/cartSlice';
import styles from '../../styles/Product.module.css';

export default function Product({ pizza }) {
  const [itemPrice, setItemPrice] = useState(pizza.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const dispatch = useDispatch();

  // const pizza = {
  //   id: 1,
  //   image: '/images/pizza.png',
  //   title: 'CAMPAGNOLA',
  //   prices: [19.9, 23.9, 27.9],
  //   description:
  //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.',
  // };

  function changePrice(number) {
    setItemPrice(itemPrice + number);
  }

  function handleSize(sizeIndex) {
    const diff = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(diff);
  }

  function handleChange(e, option) {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  }
  console.log(extras);

  function handleClick() {
    dispatch(addProduct({ ...pizza, extras, itemPrice, quantity }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.image} alt='' layout='fill' objectFit='contain' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${itemPrice}</span>
        <p className={styles.description}>{pizza.description}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/images/size.png' alt='' layout='fill' />
            <span className={styles.label}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/images/size.png' alt='' layout='fill' />
            <span className={styles.label}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/images/size.png' alt='' layout='fill' />
            <span className={styles.label}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div key={option._id} className={styles.option}>
              <input
                type='checkbox'
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor='double'>{option.text}</label>
            </div>
          ))}
        </div>

        <div className={styles.add}>
          <input
            type='number'
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
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
