import axios from "axios"
const baseurl = "http://localhost:3001/api/persons"

const getContacts = () => {
    return axios.get(baseurl)
}

const createContact = newContact => {
    return axios.post(baseurl, newContact)
}

const deleteContact = id => {
    return axios.delete(`${baseurl}/${id}`)
}

const editContact = (updatedContact) => {
    return axios.put(`${baseurl}/${updatedContact.id}`, updatedContact)
}
const exports = {getContacts, createContact, deleteContact, editContact}
export default exports