'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '@/ReduxStore/Slices/productSlice'
import { getProducts, getUserCart } from '@/Helpers/ApiHelper'
import { addProduct, reduceProduct, selectCart } from '@/ReduxStore/Slices/cartSlice'
import { FaPlus, FaMinus } from "react-icons/fa6";
import Link from 'next/link'
import Loader from '@/Components/Loader'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


const Cart = () => {
    const { data, status } = useSession()
    const userId = data?.user?.id;
    const dispatch = useDispatch()
    const router = useRouter()

    const [productsWithDetails, setProductsWithDetails] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    //Fetch product and cart data from redux store
    const products = useSelector(selectProducts)
    const cartData = useSelector(selectCart)

    useEffect(() => {
        dispatch(getProducts())
        if (userId) {
            dispatch(getUserCart(userId))
        }
    }, [userId])

    useEffect(() => {
        // Update productsWithDetails and totalAmount
        const updatedProducts = cartData?.products?.map(cartProduct => {
            const productDetails = products?.find(product => product?.id === cartProduct?.productId);

            if (productDetails) {
                return {
                    ...productDetails,
                    quantity: cartProduct.quantity,
                };
            }
            return null;
        });

        setProductsWithDetails(updatedProducts);

        const updatedTotalAmount = updatedProducts?.reduce((accumulator, product) => {
            const productAmount = product?.price * product?.quantity;
            return accumulator + productAmount;
        }, 0);

        setTotalAmount(updatedTotalAmount);
    }, [cartData, products,]);

    const handleAddProduct = (productId, quantity) => {
        dispatch(addProduct({ productId, quantity }));
        toast.success("Product quantity updated successfully.")
    };

    const handleReduceProduct = (productId, quantity) => {
        dispatch(reduceProduct({ productId, quantity }));
        if (quantity) {
            toast.success("Product quantity updated successfully.")
        } else {
            toast.success("Product has been removed successfully.")
        }
    };

    const checkoutHandler = () => {
        setIsSubmitting(true)
        setTimeout(() => {
            router.push('/successOrder');
        }, 1500);
    }

    return (
        <div className="bg-white flex justify-center mt-5">
            <div className="border-solid border-2 border-gray-200 rounded-md w-2/5">
                <div className="mx-auto max-w-2xl px-5 py-3 lg:max-w-7xl">
                    <h2 className="text-2xl font-bold text-center text-gray-800" >Cart</h2>
                </div>
                <hr />
                {!isLoading ? <>
                    {productsWithDetails?.length > 0 ? <div className="py-5 px-7">
                        <div className="mt-8 mb-6">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {productsWithDetails.map((product, index) => {
                                        return (<li className="flex py-6" key={index}>
                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <Link href={`/products/${product?.id}`}>
                                                    <Image
                                                        className='h-full w-full object-cover object-center lg:h-full lg:w-full py-3'
                                                        width={90}
                                                        height={90}
                                                        style={{ objectFit: 'scale-down' }}
                                                        src={product?.image}
                                                        alt={`Card img cap${index}`}
                                                    />
                                                </Link>
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            {product?.title}
                                                        </h3>
                                                        <p className="ml-4">${product?.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product?.category}</p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <p className="text-gray-500">Qty {product?.quantity}
                                                    </p>
                                                    <div className='flex cursor-pointer'>
                                                        <div class="inline-flex">
                                                            <button class="bg-white-300 border border-gray-400 hover:bg-indigo-400 text-gray-800 font-bold py-1 px-2 rounded-l" onClick={() => {
                                                                handleReduceProduct(product?.id, 1)
                                                            }}>
                                                                <FaMinus size={17} />
                                                            </button>
                                                            <button class="bg-white-300 border border-gray-400 hover:bg-indigo-400 text-gray-800 font-bold py-1 px-2 rounded-r" onClick={() => { handleAddProduct(product?.id, 1) }}>
                                                                <FaPlus size={17} />
                                                            </button>

                                                        </div>
                                                    </div>

                                                    <div className="flex">
                                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => handleReduceProduct(product?.id)}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>)
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 py-6">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p className='text-xl'>Subtotal</p>
                                <p className='text-xl'>${totalAmount.toFixed(2)}</p>
                            </div>
                            <div className="mt-6">
                                <button type='button' className={`w-full rounded-md py-3 px-6 font-medium text-white ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600  hover:bg-indigo-700 cursor-pointer'}`} onClick={() => { checkoutHandler() }}
                                    disabled={isSubmitting}
                                > {isSubmitting ? 'Loading...' : 'Checkout'} </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <Link href='/'>
                                    or {"  "}
                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                        :
                        <div className='text-center py-5 px-7'>
                            <h3 className='text-lg'>Your Shopping Cart is empty.</h3>
                            <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
                                <Link href='/'>
                                    <button type="button" className="text-md text-indigo-600 hover:text-indigo-500">
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </Link>
                            </div>
                        </div>}
                </>
                    : <Loader />
                }
            </div>
        </div>
    )
}

export default Cart