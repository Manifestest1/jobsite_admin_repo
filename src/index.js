import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom'
import 'core-js';
import { AuthProvider } from './api_service/AuthContext';
import App from './App';
import store from './store';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </HashRouter>
);
