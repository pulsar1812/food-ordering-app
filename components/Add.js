import { useState } from 'react';

import styles from '../styles/Add.module.css';

export default function Add({ setClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  function changePrice(e, index) {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices[currentPrices];
  }

  function handleExtraInput(e) {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  }

  function handleExtra() {
    setExtraOptions((prev) => [...prev, extra]);
  }

  function handleCreate() {}

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={() => setClose(true)}>
          X
        </span>
        <h1>Add a new pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            type='text'
            value={title}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea
            rows={4}
            type='text'
            value={description}
            className={styles.input}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              type='number'
              placeholder='Small'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              type='number'
              placeholder='Medium'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              type='number'
              placeholder='Large'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              type='text'
              placeholder='Item'
              name='text'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={handleExtraInput}
            />
            <input
              type='number'
              placeholder='Price'
              name='price'
              className={`${styles.input} ${styles.inputSm}`}
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option._id} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>

        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  );
}
