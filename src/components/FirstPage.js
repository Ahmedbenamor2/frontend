import { useNavigate } from 'react-router-dom';
import classes from './FirstPage.module.css';
import { useEffect, useState } from 'react';
import ui from '../UI/Button.module.css';

const FirstPage = () => {
    let [elt, setElt] = useState(<div className={classes.loader}></div>);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            navigate('/home');
        }
        else {
            setElt(<div className={classes.container}>
                <div className={classes.slice}>
                    <h1>Welcome to QuickTask</h1>
                    <button onClick={loginHandler} className={ui.button}>Connextion</button>
                    <button onClick={signUpHandler} className={ui.button}>Sign up</button>
                </div>
                <div className={classes.slice}>
                </div>
            </div>)
        }
    }, [])
    const loginHandler = () => {
        navigate('/login');
    }
    const signUpHandler = () => {
        navigate('/signup');
    }

    return (<>

        {elt}

    </>)
}

export default FirstPage;