interface ProductImage {
  id: number
  width: number
  height: number
  position: number
  src: string
  variant_ids: string[]
  created_at: string
  updated_at: string
  admin_graphql_api_id: string
  alt: string
}

export interface Product {
  id: number
  title: string
  status: string
  admin_graphql_api_id: string
  body_html: string
  created_at: string
  handle: string
  image: ProductImage
  images: ProductImage[]
  product_type: string
  tags: string[]
  vendor: string
}

export interface ProductsResponse {
  data: any
  status: boolean
  message: string
}
