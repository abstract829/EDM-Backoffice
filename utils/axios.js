import axios from 'axios'

const apiURL = 'https://edm.desintegra.com/desa1'

const api = axios.create({
  baseURL: apiURL,
})

export default api
