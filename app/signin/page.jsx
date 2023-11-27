'use client'
import { useState } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const SignIn = () => {
    const router = useRouter()
    const [data, setData] = useState({ username: "", password: "" })

    const loginUser = async (e) => {
        e.preventDefault()
        signIn('credentials', { ...data, redirect: false, callbackUrl: `${window.location.origin}` })
            .then((res) => {
                if (res?.error) {
                    toast.error(res.error)
                }
                if (res?.ok && !res?.error) {
                    toast.success("Logged in successfully.")
                    router.push('/')
                }
            })
    }

    return (
        <div className="bg-white flex justify-center mt-5">
            <div className="border-solid border-2 border-gray-200 rounded-md w-2/5">
                <div className="mx-auto max-w-2xl px-5 py-3 lg:max-w-7xl">
                    <h2 className="text-2xl font-bold text-center text-gray-800" > Login for an account</h2>
                </div>
                <hr />

                <div className="m-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={loginUser}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    value={data.username}
                                    onChange={e => setData({ ...data, username: e.target.value })}
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    value={data.password}
                                    onChange={e => setData({ ...data, password: e.target.value })}
                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn