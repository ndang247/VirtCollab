import axios from 'axios';

const URL = 'http://localhost:8080';

// Authentication.
export const auth = (isSignUp, form) => axios.post(`${URL}/api/auth/${isSignUp ? 'register' : 'login'}`, form);
