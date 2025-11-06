import axios from 'axios';

// Get the API URL from the environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is crucial for Flask-Login session cookies
});