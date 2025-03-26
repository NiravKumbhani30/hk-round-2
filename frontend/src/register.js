import React, { useState } from 'react';
import axios from 'axios';
import apiRequest from './helper/ApiInterceptor';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validations = [
            { check: () => !formData.username, message: 'Username is required' },
            { check: () => !formData.email, message: 'Email is required' },
            { check: () => !formData.password, message: 'password is required' },
            { check: () => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email), message: 'Please enter a valid email address' },
            { check: () => formData.password.length < 6, message: 'Password must be at least 6 characters long' }
        ];

        const invalid = validations.find(validation => validation.check());
        if (invalid) {
            setMessage(invalid.message);
            return;
        }

        try {
            const response = await apiRequest.post('/auth/register', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;