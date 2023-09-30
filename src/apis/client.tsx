import axios from 'axios'

export default class Client {
  static async getProducts(token: string) {
    const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/products/sync`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    return data
  }
}
