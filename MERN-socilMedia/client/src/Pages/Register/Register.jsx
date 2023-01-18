import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.scss';


export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate()

    const handleSubmit = async (e) => { 
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords do not match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user);
                navigate('/login')
            }
            catch (err) {
                console.log(err);
            }
        }
        
    }

    return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="left">
                    <h3><sub>pg</sub>Social</h3>
                    <span>Helps you connect and share with the people in your life.</span>
                </div>
                <form className="right" onSubmit={handleSubmit}>
                    <div className="loginBox">
                        <input type="text" required placeholder='Username' ref={username}/>
                        <input type="email" required placeholder='Email address' ref={email}/>
                        <input type="password" minLength="6" placeholder='Password' ref={password}/>
                        <input type="password" required placeholder='Confirm Password' ref={confirmPassword}/>
                        <button>Sign up</button>
                        <button className="create">Log into Acount</button>
                    </div>
                </form>
            </div>
        </div>
    )
}