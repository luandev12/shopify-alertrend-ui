import { useEffect, useState } from 'react'
import { AppBridgeProvider } from '../components/Providers'

import Client from '../apis/client'
import { Button } from 'antd'

import { ProductsResponse, Product } from '../models'
import withAuth from '../libs/withAuth'

const IndexPage = ({ token }: any) => {
  const [products, setProducts] = useState<ProductsResponse>()

  const fetchProducts = async (): Promise<any> => {
    const data = await Client.getProducts(token)
    return data as ProductsResponse
  }

  useEffect(() => {
    fetchProducts().then(data => setProducts(data))
  }, [])

  return (
    <AppBridgeProvider>
      <div
        className="mx-3 font-weight-bold"
        onClick={() => {
          navigator.clipboard.writeText(token)
        }}
      >
        {token}
      </div>
      <ol>
        {products?.data?.map((product: Product) => (
          <li className="d-flex mb-2">
            <div className="">{product.title}</div>
            <Button type="primary" className="mx-3" onClick={() => {}}>
              Edit
            </Button>
          </li>
        ))}
      </ol>
    </AppBridgeProvider>
  )
}

export default withAuth(IndexPage)
