import { useRef, useState } from 'react';
import './login.scss';
import { loginCall } from '../../apiCalls';
import { useContext } from 'react';
import { Context } from '../../Context/context';
import { CircularProgress } from '@mui/material';


export default function Login() {

    const [error, setError] = useState(false);

    const email = useRef()
    const password = useRef()
    const { user, isFetching, dispatch } = useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            loginCall({
                email: email.current.value,
                password: password.current.value
            }, dispatch)  
        } catch (error) {
            setError(true)
        }
        
    }
    console.log(user);
    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="left">
                    <h3><sub>pg</sub>Social</h3>
                    <span>Helps you connect and share with the people in your life.</span>
                </div>
                <div className="right">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input type="email" placeholder='Email address' ref={email} required/>
                        <input type="password" placeholder='Password' ref={password} required minLength="6"/>
                        <button>{isFetching ? (<CircularProgress style={{ marginTop: "-4px", color: "white", height: 15, width: 15 }} />) : ('Log in')}</button>
                        {error && <span>Something went wrong!!!</span>}
                        <span>Forgot password?</span>
                        <button className="create">{isFetching ? (<CircularProgress style={{marginTop:"-4px", color: "white", height: 15, width: 15}}/>) : ('Create New Acount')}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}