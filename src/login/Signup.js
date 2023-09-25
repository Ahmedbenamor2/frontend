import styles from './Login.module.css';
import classes from './Signup.module.css';
import { useEffect, useRef, useState } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';
import ui from '../UI/Button.module.css';

const Signup=()=>{
    const emailRef=useRef('');
    const nameRef=useRef('');
    const pwRef=useRef('');
    const checkPwRef=useRef('');
    const [message,setMessage]=useState('');

    const data=useActionData();

    useEffect(()=>{
        if(data){
            setMessage(data.message.map((error,index)=><li key={index}>{error}</li>))
        }
        else{
            setMessage('')
        }
    },[data])

   

    return (
        <div className={styles.body}>
        <div className={classes.form}>
            <ul>
                {message}
            </ul>
            <Form method='post'>
                <input type='text'className={styles.input} ref={emailRef} name='email' required/>
                <label className={styles.label}>e-mail</label>
                <input type='text' className={styles.input} ref={nameRef} name='name' required/>
                <label className={styles.label}>choose username</label>
                <input type='password' className={styles.input} ref={pwRef} name='password' required/>
                <label className={styles.label}>choose password</label>
                <input type='password' className={styles.input} ref={checkPwRef} name='checkPw' required/>
                <label className={styles.label}>confirm password</label>
                <button className={ui.button}>Sign up</button>
            </Form>
        </div>
        </div>
    )
}

export default Signup;

export async function action({request,params}){
    const data=await request.formData();
    const method=request.method;
    if(data.get('password') !== data.get('checkPw')){
        alert('Passwords does not match!')
        return null
    }
    else{
        const userData={
            name:data.get('name'),
            email:data.get('email'),
            password:data.get('password')
        }
        const response=await fetch('http://localhost:3333/auth/signup',{
            method:method,
            body:JSON.stringify(userData),
            headers:{
                'content-type':'application/json'
            }
        })
        if(response.status===500){
            return {message:'Email already exists!',status:500}
        }

        if(!response.ok){
            return response;
        }

        return redirect('/');
    }
}