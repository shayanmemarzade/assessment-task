import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useDispatch } from 'react-redux';
import { addComment } from '../store/slices/productsSlice';
import calculateAverageRate from '../utils/calculateAverageRate';
import CommentSorter from '../utils/commentSorter';
import formatTimestampToMMDDYYYY from '../utils/formatDate';
import { useForm, Controller } from "react-hook-form";
import { Product, Comment } from '../types';
import { RootState } from '../store';

type FormValues = {
  rate: number
  comment: string
};

export default function ProductDetail() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      rate: undefined,
      comment: "",
    },
  });
  const products = useSelector((state: RootState) => state.products);
  const product = products.find((p: Product) => p.id === Number(productId)) as Product;
  const [activeTab, setActiveTab] = useState<'details' | 'comments'>('details');
  const submitComment = (data: FormValues) => {
    const { rate, comment } = data;
    const date = (new Date()).toISOString();

    dispatch(addComment({ productId: Number(productId), date, comment, rate }));
    reset();
  }

  return (
    <div className="px-4 py-16 mx-auto max-w-2xl lg:max-w-7xl">
      <div className="w-full flex flex-wrap mb-10">
        <img alt="ecommerce" className="lg:w-1/2 w-full rounded border border-gray-200 p-4" src={product.image} />
        <div className="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
          <h1 className="text-3xl font-medium mb-1">{product.name}</h1>
          <div className="mb-4 flex items-center gap-4">
            <div className="flex">
              <b className='text-yellow-500 text-lg mr-1'>{calculateAverageRate(product.comments)}</b>
              <Rating
                style={{ maxWidth: 130 }}
                value={calculateAverageRate(product.comments)}
                readOnly
              />
            </div>
            <span onClick={() => setActiveTab('comments')}>{product.comments.length} Comment{product.comments.length > 1 ? 's' : ''}</span>
          </div>
          <p className="mb-6">{product.description}</p>
          <div className="">
            <div className="font-medium text-2xl">${product.price}</div>
            <div className="font-medium text-2xl"> Arrival Date: {formatTimestampToMMDDYYYY(product.arrival_date)}</div>
          </div>
        </div>
      </div>
      <ul className="flex flex-wrap text-sm font-medium text-center border-b border-gray-200 mb-10">
        <li className="me-2">
          <div onClick={() => setActiveTab('details')}
            className={`inline-block p-4 rounded-t-lg ${activeTab === 'details' ? 'text-blue-600 bg-gray-100' : 'cursor-pointer'}`}>Details</div>
        </li>
        <li className="me-2">
          <div onClick={() => setActiveTab('comments')}
            className={`inline-block p-4 rounded-t-lg ${activeTab === 'comments' ? 'text-blue-600 bg-gray-100' : 'cursor-pointer'}`}>Comments</div>
        </li>
      </ul>

      {activeTab === 'details' &&
        <section>
          <ul className="space-y-4 text-gray-500">
            <li>
              <b>Brand:</b> {product.product_detail.brand}
            </li>
            <li>
              <b>Model:</b> {product.product_detail.model}
            </li>
            <li>
              <b>Warranty:</b> {product.product_detail.warranty}
            </li>
          </ul>
        </section>
      }
      {activeTab === 'comments' &&
        <section className="pb-16">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold">Add your review</h2>
            </div>
            <form className="mb-6" onSubmit={handleSubmit(submitComment)}>
              <Controller
                control={control}
                name="rate"
                defaultValue={5}
                render={({ field: { value, onChange } }) => (
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={value}
                    onChange={onChange}
                    className='mb-4'
                  />
                )}
              />
              <div className="mb-4">
                <label htmlFor="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows={6}
                  className="w-full py-2 px-4 text-sm  rounded-lg rounded-t-lg border border-gray-200 focus:ring-0 focus:outline-none"
                  placeholder="Write a comment..."
                  {...register("comment", {
                    required: {
                      value: true,
                      message: "Comment is required",
                    },
                  })}
                ></textarea>
                {errors?.comment && <p className="text-red-500">{errors?.comment?.message}</p>}
              </div>
              <button
                className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                type="submit"
              >
                Post comment
              </button>
            </form>

            {CommentSorter(product?.comments || [])
              .map((comment: Comment, index: number) => (
                <article key={index} className="py-6 border-t border-gray-200">
                  <div className="mb-2 flex justify-between">
                    <Rating
                      style={{ maxWidth: 130 }}
                      value={comment.rate}
                      readOnly
                    />  <span className="text-gray-500"> {formatTimestampToMMDDYYYY(comment.date)}</span>
                  </div>
                  <p className="text-gray-500">
                    {comment.comment}
                  </p>

                </article>
              )
              )}
          </div>
        </section>
      }
    </div>

  )
}
