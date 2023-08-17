import styles from './Login.module.css';
import classes from './Signup.module.css';
import { useEffect, useRef, useState } from 'react';
import { Form, redirect, useActionData } from 'react-router-dom';

const Signup=()=>{
    const emailRef=useRef('');
    const nameRef=useRef('');
    const pwRef=useRef('');
    const checkPwRef=useRef('');
    const [message,setMessage]=useState('');

    const data=useActionData();

    useEffect(()=>{
        if(data){
            setMessage(<p style={{color:'red',fontSize:10}}>{data.message}</p>)
        }
        else{
            setMessage('')
        }
    },[data])

    // const submitHandler=async (event)=>{
    //     event.preventDefault();
    //     console.log(JSON.stringify({
    //         name:nameRef.current.value,
    //         email:emailRef.current.value,
    //         password:pwRef.current.value
    //     }))
    //     if(pwRef.current.value!==checkPwRef.current.value){
    //         alert('Passwords do not match');
    //     }
    //     else{
    //         const response=await fetch("http://localhost:3333/auth/signup",{
    //             method:"POST",
    //             body: JSON.stringify({
    //                 name:nameRef.current.value,
    //                 email:emailRef.current.value,
    //                 password:pwRef.current.value
    //             }),
    //             headers:{
    //                 'content-type' : 'application/json'
    //             },
    //             mode:'no-cors'
    //         })
    //         const data=await response.json();
    //         console.log(data);
    //     }
    // }

    return (
        <div className={styles.body}>
        <div className={classes.form}>
            <Form method='post'>
                {message}
                <label className={styles.label}>e-mail:</label>
                <input type='text'className={styles.input} ref={emailRef} name='email' />
                <label className={styles.label}>choose username:</label>
                <input type='text' className={styles.input} ref={nameRef} name='name' />
                <label className={styles.label}>choose password:</label>
                <input type='password' className={styles.input} ref={pwRef} name='password' />
                <label className={styles.label}>confirm password</label>
                <input type='password' className={styles.input} ref={checkPwRef} name='checkPw' />
                <button className={styles.button}>Sign up</button>
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