import React, { useState } from 'react';
import Cookie from "js-cookie";
import apiRequest from './helper/ApiInterceptor';
import { useEffect } from 'react';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const token = Cookie.get(process.env.REACT_APP_COOKIE_NAME);
        if (token) {
            setUser(token);
        }
    }, [setUser]);

    const handleSubmit = async (e) => {

        const validations = [
            { check: () => !formData.email || !formData.password, message: 'Email and password are required' },
            { check: () => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email), message: 'Please enter a valid email address' },
            { check: () => formData.password.length < 6, message: 'Password must be at least 6 characters long' }
        ];

        const invalid = validations.find(validation => validation.check());
        if (invalid) {
            setMessage(invalid.message);
            return;
        }

        try {
            const response = await apiRequest.post('/auth/login', formData);
            console.log(">_< ~ handleSubmit ~ response:", response)
            Cookie.set(process.env.REACT_APP_COOKIE_NAME, response.token, {
                expires: 7 * 24 * 60 * 60,
            });
            setMessage(response.message);
            setUser(response.token);
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <div>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="button" onClick={handleSubmit}>Login</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;