import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import calculateAverageRate from '../utils/calculateAverageRate';
import { Product } from '../types';

interface state {
  products: Product[];
}

export default function Products() {
  const products: Product[] = useSelector((state: state) => state.products);

  return (
    <div className="px-4 py-16 mx-auto max-w-2xl lg:max-w-7xl">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group border rounded-md p-4">
            <Link to={`/product/${product.id}`}>
              <div className="w-full flex items-center justify-center group-hover:opacity-75 lg:h-80">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full object-cover object-center"
                />
              </div>
              <Rating
                style={{ maxWidth: 130 }}
                value={calculateAverageRate(product.comments)}
                readOnly
              />
              <div className="mt-4 flex justify-between">
                <h3 className="text-sm">
                  {product.name}
                </h3>
                <p className="text-sm font-medium">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
