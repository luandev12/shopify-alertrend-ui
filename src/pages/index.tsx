import { useEffect, useState } from 'react'
import { AppBridgeProvider } from '../components/Providers'
import createApp from '@shopify/app-bridge'
import { getSessionToken } from '@shopify/app-bridge/utilities'
import axios from 'axios'
// import { useHistory, Route } from 'react-router-dom'

import Client from '../apis/client'
import { Button } from 'antd'

import { ProductsResponse, Product } from '../models'

const IndexPage = () => {
  // const history = useHistory()

  const [products, setProducts] = useState<ProductsResponse>()

  const handleAuthor = async () => {
    const shopifyHost = new URL((window as any).location).searchParams.get('host') as string

    console.log(shopifyHost)
    const app = createApp({ apiKey: import.meta.env.VITE_API_SHOPIFY_KEY, host: shopifyHost })
    const sessionToken = await getSessionToken(app)

    const { data } = await axios({
      method: 'get',
      url: 'http://localhost:3002/shopify/verify',
      headers: {
        authorization: `Bearer ${sessionToken}`,
      },
    })

    console.log(data, sessionToken, 'session Token')
  }

  const fetchProducts = async (): Promise<ProductsResponse> => {
    const data = await Client.getProducts()
    return data as ProductsResponse
  }

  const handleUpdateProduct = async (product: Product) => {
    console.log(product, 'handleUpdateProduct')
    // history.push(`/${product.id}`)
  }

  useEffect(() => {
    handleAuthor()
    fetchProducts().then((data: ProductsResponse) => {
      console.log(data)
      setProducts(data)
    })
  }, [])

  return (
    <AppBridgeProvider>
      <div className="mx-3 font-weight-bold">Products</div>
      <ol>
        {products?.data.map((product: Product) => (
          <li className="d-flex mb-2">
            <div className="">{product.title}</div>
            <Button type="primary" className="mx-3" onClick={() => handleUpdateProduct(product)}>
              Edit
            </Button>
          </li>
        ))}
      </ol>
    </AppBridgeProvider>
  )
}

export default IndexPage
