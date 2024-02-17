
import React, { useState } from 'react';
import axios from 'axios';


function MyLoginPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:5000/api/signup', { username, email, password });
            alert('Signup successful');
        } catch (error) {
            alert('Signup failed');
        }
    };

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:5000/api/login', { email: loginEmail, password: loginPassword });
            alert('Login successful');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <>
            <div className='h-auto flex w-screen  justify-center '>
                    <div className='flex-col w-110 m-2 rounded-xl bg-sky-300 mt-10 '>
                        <div className=' mt-10 mb-10 text-xl font-bold text-center'>
                            <h2>Signup</h2>
                        </div>
                        <div className='flex-col m-4 rounded-xl'>
                            <div>
                                <input className='m-4 h-10 w-80 rounded-md p-2' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <input className='m-4 h-10 w-80 rounded-md p-2' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input className='m-4 h-10 w-80 rounded-md p-2' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className=' mt-5 font-semibold text-center'>
                                <button className='m-10 h-10 w-44 rounded-2xl bg-blue-800 text-white' onClick={handleSignup}>Signup</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='flex-col w-110 h-100 m-2 rounded-xl bg-sky-300 mt-10'>
                    <div className=' mt-10 mb-10 text-xl font-bold text-center'>
                        <h2>Login</h2>
                    </div>
                    <div className='flex-col m-4 rounded-xl'>
                        <div>
                            <input className='m-4 h-10 w-80 rounded-md p-2' type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                            <input className='m-4 h-10 w-80 p-2 rounded-md' type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <div className=' mt-5 font-semibold text-center'>
                            <button className='mt-10 h-10 w-44 rounded-2xl bg-blue-800 text-white' onClick={handleLogin}>Login</button>
                        </div>

                    </div>
                    <div className='flex justify-center mt-5' >
                                <p>Dont have an account ? Sign Up</p>
                    </div>
                </div> */}
        </>
    );
}

export default MyLoginPage;
