import axios from 'axios'

const getCountryByName = async (name) => {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    return response.data
}

export { getCountryByName }