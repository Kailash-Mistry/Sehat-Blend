import React, { useState } from 'react';
import axios from 'axios';
import Logo1 from '../../assets/logo-final-2.png';
import img from '../../assets/login-img.png';

function MyLoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // State variable to track whether in signup mode or not

    const handleSignup = async () => {
        try {
            await axios.post('http://localhost:5000/api/signup', { username, email, password });
            alert('Signup successful');
            onLogin(); // Update isLoggedIn state after successful signup
        } catch (error) {
            alert('Signup failed');
        }
    };

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:5000/api/login', { email: loginEmail, password: loginPassword });
            alert('Login failed');
            onLogin(); // Update isLoggedIn state after successful login
        } catch (error) {
            alert('Login successful');
        }
    };

    return (
        <>
            <div className='h-screen flex w-screen  justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...'>
                {isSignUp ? ( // Render signup page if isSignUp is true
                    <div>
                        <div className='flex items-center justify-center h-120 m-2 rounded-xl mt-10 mb-20'>
                            <img className="rounded-xl" src={img} alt="" />
                        </div>
                        <div className='flex-col w-110 m-2 rounded-xl bg-sky-100 mt-10 '>
                            <div className=' mt-10 mb-10 text-xl font-bold text-center'>
                                <h2>Signup</h2>
                            </div>
                            <div className='flex-col m-4 rounded-xl'>
                                <div>
                                    <input className='b-10 m-4 h-10 w-80 rounded-md p-2' type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    <input className='b-10 m-4 h-10 w-80 rounded-md p-2' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <input className='b-10 m-4 h-10 w-80 rounded-md p-2' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className=' mt-5 font-semibold text-center'>
                                    {/* Call handleSignup and onLogin simultaneously on button click */}
                                    <button className='m-10 h-10 w-44 rounded-2xl bg-blue-800 text-white' onClick={() => { handleSignup(); onLogin(); }}>Signup</button>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className='flex'>
                        <div className='flex items-center justify-center h-120 m-2 rounded-xl mt-10 mb-20'>
                            <img className="rounded-xl" src={img} alt="" />
                        </div>
                        <div className='flex-col w-110 h-120 m-2 rounded-xl bg-sky-100 mt-10 mb-20'>
                            <div className=' mt-10 mb-10 text-xl font-bold text-center'>
                                <h2>Login</h2>
                            </div>
                            <div className='flex-col m-4 rounded-xl'>
                                <div>
                                    <input className='border-2 border-gray-700 focus:border-blue-500 focus:outline-none m-4 h-10 w-80 rounded-md p-2' type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                    <input className='border-2 border-gray-700 focus:border-blue-500 focus:outline-none m-4 h-10 w-80 rounded-md p-2' type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                                <div className=' mt-5 font-semibold text-center'>
                                    {/* Call handleLogin and onLogin simultaneously on button click */}
                                    <button className='mt-10 h-10 w-44 rounded-2xl bg-blue-800 text-white' onClick={() => { handleLogin(); onLogin(); }}>Login</button>
                                </div>
                                <div className='flex justify-center mt-5' >
                                    {/* Toggle to signup mode on click */}
                                    <p onClick={() => setIsSignUp(true)}>Don't have an account ? Sign Up</p>
                                </div>
                                <div className='flex justify-center mt-20'>
                                    <img className="p-2 h-20" src={Logo1} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default MyLoginPage;
