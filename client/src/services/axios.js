import axios from 'axios'

const API_URL = 'https://localhost:80/api'
export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
