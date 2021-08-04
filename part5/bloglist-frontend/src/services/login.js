import axios from "axios"
const baseUrl = "/api/login"

const login = async creds => {
    console.log(creds)
    const response = await axios.post(baseUrl, creds)
    console.log(response)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {login}