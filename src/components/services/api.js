import axios from 'axios'

const instance = axios.create();

const BASE_URL = 'https://todo-task-api.herokuapp.com/'
instance.defaults.baseURL = BASE_URL

export default instance;