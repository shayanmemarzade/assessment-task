export interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  arrival_date: string
  product_detail: ProductDetail
  comments: Comment[]
}

export interface ProductDetail {
  brand: string
  model: string
  warranty: string
}

export interface Comment {
  date: string
  comment: string
  rate: number
}
