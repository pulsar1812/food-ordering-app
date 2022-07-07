import { useState } from 'react';

import styles from '../styles/OrderDetail.module.css';

export default function OrderDetail({ total, createOrder }) {
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');

  function handleClick() {
    createOrder({ customer, address, total, method: 0 });
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>You will pay ${total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            type='text'
            placeholder='Chris Wong'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type='text'
            placeholder='+852 9111 1111'
            className={styles.input}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder='No.5 Nathan Road'
            type='text'
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
  );
}
