import React, { useState, useEffect }  from 'react';
import { navigate } from 'hookrouter';
import Cookies from 'js-cookie';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '' || password === '' || confirmPassword === '') {
            setError(true);
            setErrorMessage('Error: All fields must be completed.');
        } else if(password !== confirmPassword) {
            setError(true);
            setErrorMessage('Error: The passwords must match.');
        } else {
            fetch('https://josh-hookstore-api.herokuapp.com/user/add', {
                method: 'POST',
                headers: { 'content-type': 'application/json'},
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res === 'Error: the username is taken.') {
                    setError(true);
                    setErrorMessage('Error: The username is taken.');
                } else {
                    setError(false);
                    setErrorMessage('');
                    Cookies.set('username', username);
                    navigate('/')
                }
            })
            .catch(error => {
                console.log('Error with creating your user.', error);
                setError(true);
                setErrorMessage('Error adding the user, Try again please.');
            })
        }

    }


    return (
        <div className='signup-container main-body'>
            
            <form className='signup-form' onSubmit={(e) => handleSubmit(e)}>
                <h2 className='title'>Fill out this form to register.</h2>

                <div className='input-form-container'>
                    <input type='text' placeholder='Username' value={username} name="username" onChange={(e) => setUsername(e.target.value)}/>
                    <input type='text' placeholder='Password' value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>
                    <input type='text' placeholder='Confirm Password' value={confirmPassword} name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    
                    <button className='btn'>Submit</button>
                </div>
               
            </form>

            <h6 style={{visibility: error ? 'visible' : 'hidden'}}>{errorMessage}</h6>
        </div>
    )
}