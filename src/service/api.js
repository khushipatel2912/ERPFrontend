import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' }); // Update base URL as needed

// Add Authorization token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (data) => API.post('/login', data);
export const getEligibleOrganisations = () => API.get('/students/eligible-organisations');
export const applyPlacement = (data) => API.post('/placements/apply', data);
