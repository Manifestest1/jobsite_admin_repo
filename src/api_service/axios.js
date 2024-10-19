import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/admin',
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post('http://localhost:8000/api/admin/refresh-token', {
          refreshToken: localStorage.getItem('_refreshToken'),
        });
        // Save the new token and update the Authorization header
        localStorage.setItem('_token', response.data.access_token);
        instance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Clear tokens and redirect to login or show feedback
        localStorage.removeItem('_token');
        localStorage.removeItem('_refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('loggedIn');
        // Optionally, redirect to the login page
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
