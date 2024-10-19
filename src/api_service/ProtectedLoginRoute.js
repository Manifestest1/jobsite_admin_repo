'use client'
import { useContext, useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route, Link,useNavigate  } from 'react-router-dom';

import AuthContext from './AuthContext'

const ProtectedRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user)
    {
        navigate('/dashboard');
    }
  }, [loading, user, navigate])

  if (loading || user)
  {
    return <p>Loading...</p>
  }

  return children
}

export default ProtectedRoute
