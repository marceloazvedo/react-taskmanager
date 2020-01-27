import { create } from 'axios'

const BASE_URL = 'https://todo-task-api.herokuapp.com/api/'

export default create({ baseUrl: BASE_URL });