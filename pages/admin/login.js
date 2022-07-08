import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();

  async function handleClick() {
    try {
      await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      router.push('/admin');
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Login</h1>
        <input
          type='text'
          value={username}
          placeholder='Username'
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          value={password}
          placeholder='Password'
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleClick}>
          Sign In
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
}
