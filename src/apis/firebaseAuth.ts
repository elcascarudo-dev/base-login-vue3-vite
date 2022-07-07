import axios from 'axios'


const firebaseAuthApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
      key: import.meta.env.VITE_APP_API_KEY
    }
});



export default firebaseAuthApi;