import Image from 'next/image';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src='/images/bg.png' alt='' objectFit='cover' layout='fill' />
      </div>

      <div className={styles.item}>
        {/* Motto */}
        <div className={styles.card}>
          <h1 className={styles.motto}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
            laboriosam.
          </h1>
        </div>
        {/* Address & Phone No, */}
        <div className={styles.card}>
          <h1 className={styles.title}>Find Our Restaurant</h1>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> NewYork, 85022
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            2356 K. Laquie Rd #235.
            <br /> NewYork, 85022
            <br /> (602) 867-1011
          </p>
          <p className={styles.text}>
            1614 E. Erwin St #104.
            <br /> NewYork, 85022
            <br /> (602) 867-1012
          </p>
          <p className={styles.text}>
            1614 W. Caroll St #125.
            <br /> NewYork, 85022
            <br /> (602) 867-1013
          </p>
        </div>
        {/* Opening Hours */}
        <div className={styles.card}>
          <h1 className={styles.title}>Working Hours</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
}
