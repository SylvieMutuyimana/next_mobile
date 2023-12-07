import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { AppPages } from '../../components/navigation/page_links'; 
import styles from '../../styles/module.css/authenticate.module.css';
import Link from 'next/link';
import AuthLayout from './layout';
const Signup = () => {
  const [signupError, setSignupError] = useState('');
  const [details, setDetails] = useState({
    email: '', password: ''
  });
  const router = useRouter();

  const handleSignup = async () => {
    console.log('signup handle')
    try {
      const response = await axios.post('http://localhost:3000/api/signup/admin', {
        email: details.email,
        password: details.password
      });
      
      if (response.status === 201) {
        const user_details = {email:details.email, type:'admin', _id: response.data.the_user.type}
        localStorage.setItem('user_details', JSON.stringify(user_details));
        router.push(AppPages.find((page) => page.name === 'Login').path);
      }else{
        setSignupError(response.data.message)
        console.log(response.status)
        console.log(response.data.message)
      }
    } catch (error) {
      setSignupError('Server error, refresh');
      console.error(error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <AuthLayout>
        <form id={styles.login}>
          <h4>Signup</h4>
            <input placeholder="Enter Email" value={details.email}
              onChange={handleChange} name="email" type="email" 
              autoComplete="current-email" required
            />
            <input placeholder="Enter Password" value={details.password}
              onChange={handleChange} name="password" type="password"
              autoComplete="current-password" required
            />
          <button type="button" onClick={handleSignup}>
            SIGNUP
          </button>
          {signupError && <p className="error">{signupError}</p>}
          <p style={{textAlign:'center'}}>
            <a href='#'>Signup</a> as a Facility{' '}
          </p>
        </form>
    </AuthLayout>
  );
};

export default Signup;