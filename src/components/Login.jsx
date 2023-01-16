import './Login.css';
import axios from 'axios';
import { useState } from 'react';

export const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();

    // Fake API Call
    try {
      setLoading(true);
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      setUser(data);
    } catch {
      setError(true);
    }
    setLoading(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className='container'>
      {user.name && <span>Welcome!</span>}
      <span className='user'>{user.name}</span>
      <h2>Login</h2>
      <form>
        <input
          type='text'
          placeholder='Enter your username'
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Enter your password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? 'please wait' : 'Login'}
        </button>
        <span
          data-testid='error'
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          Something went wrong!
        </span>
      </form>
    </div>
  );
};
