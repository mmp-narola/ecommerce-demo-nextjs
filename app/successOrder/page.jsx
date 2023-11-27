'use client'
import { emptyCart } from "@/ReduxStore/Slices/cartSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const SuccessOrder = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(emptyCart())
    }, [])
    return (
        <div className="bg-white flex justify-center mt-5">
            <div className="border-solid border-2 border-gray-200 rounded-md w-2/5">
                <div className="mx-auto max-w-2xl px-5 py-3 lg:max-w-7xl">
                    <h2 className="text-2xl font-bold text-center text-gray-800" >Order Status</h2>
                </div>
                <hr />
                <div className="p-5">
                    <p className="mx-5 my-3 text-xl" >Thank you, your order has been confirmed!</p>
                    <p className="mx-5 my-3 text-xl" >
                        Thank you for shopping with us. We,ll send a confirmation once your item(s) has shipped.
                    </p>
                    <div className="text-center">
                        <button className="rounded-md py-3 px-6 font-medium text-white bg-indigo-600  hover:bg-indigo-700" onClick={() => { router.push('/') }}>Go to Homepage</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessOrder