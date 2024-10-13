import React, { useState } from 'react';
import '../Styles/Authform.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const resData = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                localStorage.setItem('userToken', resData.userToken);
                setFormData({
                    email: '',
                    password: '',
                })
            } else {
                toast.error(resData.error || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login process:', error);
            toast.error('An error occurred while logging in. Please try again later.');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Sign In</h2>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="signup-btn">
                        Sign In
                    </button>

                    <p className="login-text">
                        Not have an account? <a href="/userAuth">Sign Up</a>
                    </p>
                </form>
            </div>
        </>
    );
}
