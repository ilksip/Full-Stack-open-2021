import axios from "axios"
const baseurl = "http://localhost:3001/persons"

const getContacts = () => {
    return axios.get(baseurl)
}

const createContact = newContact => {
    return axios.post(baseurl, newContact)
}

const deleteContact = id => {
    return axios.delete(`${baseurl}/${id}`)
}
const exports = {getContacts, createContact, deleteContact}
export default exports