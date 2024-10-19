'use client';
import { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate  } from 'react-router-dom';
import axios from './axios';  // Import the configured Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('_token');

        if (token)
        {
            axios.get('/profile')
                .then(response => {
                    setUser(response.data);
                    console.log(response.data,"Get user Profile");
                    setLoading(false);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setLoading(false);
                });
        }
        else
        {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {

      const response = await axios.post('/login', { email, password });

      console.log(response.data,"Context login api");
      const token = response.data.authorisation.token;

        navigate('/dashboard');


      localStorage.setItem('_token', token);
      setUser(response.data.user);

    };

    const logout = async () => {
        const response = await axios.post('/logout');

        console.log(response,"Check Logout Api");
        localStorage.removeItem('_token');
        setUser(null);

        // router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
