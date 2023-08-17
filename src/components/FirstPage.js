import { useNavigate } from 'react-router-dom';
import { classes } from './FirstPage.module.css';
import { useEffect, useState } from 'react';

const FirstPage = () => {
    let [elt,setElt]=useState(<p>Loading...</p>);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            navigate('/home');
        }
         else {
             setElt( <>
                 <h1>Welcome to my website!</h1>
                 <button onClick={loginHandler}>Connextion</button>
                 <button onClick={signUpHandler}>Sign up</button>
             </>)
         }
    },[])
    const loginHandler = () => {
        navigate('/login');
    }
    const signUpHandler = () => {
        navigate('/signup');
    }

    return (<>
        
        {elt}

        {/* <h1>Welcome to my website!</h1>
        <button onClick={loginHandler}>Connextion</button>
        <button onClick={signUpHandler}>Sign up</button> */}
    </>)
}

export default FirstPage;