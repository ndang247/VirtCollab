import axios from 'axios';

const URL = 'https://virtcollabapi.herokuapp.com';

// Authentication.
export const auth = (isSignUp, form) => axios.post(`${URL}/api/auth/${isSignUp ? 'register' : 'login'}`, form);
