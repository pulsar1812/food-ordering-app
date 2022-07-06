import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const numberOfItems = useSelector((state) => state.cart.numberOfItems);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/images/telephone.png' alt='' width={32} height={32} />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>Order Now!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/'>
            <a>
              <li className={styles.listItem}>Homepage</li>
            </a>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href={`/cart`}>
        <a>
          <div className={styles.item}>
            <div className={styles.cart}>
              <Image src='/images/cart.png' alt='' width={30} height={30} />
              <div className={styles.counter}>{numberOfItems}</div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
