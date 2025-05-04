// src/services/UserService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/auth'; // Update if needed

const UserService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login/`, {
        email,
        password,
      });

      // Save tokens to localStorage or sessionStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('username', response.data.username);

      return {
        access: response.data.access,
        refresh: response.data.refresh,
        username: response.data.username,
      };
    } catch (error) {
      throw error.response?.data || 'Login failed';
    }
  },

  signup: async (username, email, password) => {
    console.log("in sign up");
    try {
      console.log("in try");
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username,
        email,
        password,
      });

      // Save tokens after signup (optional, if you want auto-login after signup)
    //   localStorage.setItem('access_token', response.data.access);
    //   localStorage.setItem('refresh_token', response.data.refresh);
    //   localStorage.setItem('username', response.data.user.username);

      return response.data;
    } catch (error) {
      console.log("in catch of signup");
      throw error.response?.data || 'Signup failed';
    }
  },

  logout: () => {
    // Clear tokens on logout
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
  },

  getAccessToken: () => localStorage.getItem('access_token'),

  isAuthenticated: () => !!localStorage.getItem('access_token'),
};

export default UserService;
