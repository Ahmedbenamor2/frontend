import React, { useEffect, useRef, useState } from "react";
import styles from './Login.module.css';
import { Link, Form, redirect, useActionData } from "react-router-dom";
import ui from '../UI/Button.module.css';

const Login = (props) => {
  const [error, setError] = useState('');
  const emailRef = useRef('');
  const pwRef = useRef('');

  const res = useActionData();
  useEffect(() => {
    res ? setError((res.message).map((error, index) => <li key={index}>{error}</li>)) : setError('');
  }, [res])



  // const submitHandler=async (event)=>{
  //   event.preventDefault();
  //   try{
  //     const response = await fetch("http://localhost:3333/auth/login");
  //     if(!response.ok){
  //       throw new Error();
  //     }
  //     const data=await response.json();
  //     console.log(data);
  //   }catch(error){
  //     alert(error.message);
  //   }
  // }

  return (
    <div className={styles.body}>
      <div className={styles.form}>
          <ul>
            {error}
          </ul>
        <Form method="post">
          <input type="text" className={styles.input} ref={emailRef} name="email" required />
          <label className={styles.label}>Email</label>
          <input type="password" className={styles.input} ref={pwRef} name="password" required />
          <label className={styles.label}>Password</label>
          <button className={ui.button}>se connecter</button>
          <Link to='/signup'>You don't have an account?</Link>
        </Form>
      </div>
    </div>

  );
};

export default Login;

export async function action({ request, params }) {
  const data = await request.formData();
  const body = {
    email: data.get('email'),
    password: data.get('password')
  }

  const response = await fetch('http://localhost:3333/auth/login', {
    method: request.method,
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json"
    }
  })

  if (!response.ok) {
    return response;
  }
  else {
    console.log('user connected successfully!');
    const token = await response.text();
    localStorage.setItem('jwt', token);
    return redirect('/home');
  }

}