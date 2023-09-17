import axios from 'axios'

export default class Client {
  static async getProducts() {
    const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/products/sync`)
    return data
  }
}
