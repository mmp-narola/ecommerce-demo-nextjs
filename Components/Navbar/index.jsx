'use client'
import { selectCart } from '@/ReduxStore/Slices/cartSlice';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


function Navbar() {
    const router = useRouter()
    const { data, status } = useSession()
    const activeUser = data?.user;

    const cartState = useSelector(selectCart)

    const capitalizeName = (str) => {
        if (!str) {
            return "";
        }
        const firstLetter = str.charAt(0).toUpperCase()
        const restWord = str.slice(1).toLowerCase()
        return firstLetter + restWord
    }


    return (
        <div className='mb-5'>
            <nav className='header'>
                <h2 className='logo'>
                    <Link href='/'>E-COMMERCE</Link>
                </h2>
                <ul className='main-nav'>
                    {activeUser && <li>
                        <p className='navbar-menu-item'>Welcome, &nbsp;<b>{capitalizeName(activeUser?.name)}</b></p>
                    </li>}
                    {status === 'authenticated' && <li>
                        <Link href='/cart'>
                            Cart
                            {cartState?.products?.length > 0 && <span
                                className="ml-1"
                                style={{
                                    backgroundColor: "#5d63ea",
                                    borderRadius: "50px",
                                    padding: "0.00rem 0.50rem",
                                    color: "white",
                                }}
                            >
                                {cartState?.products?.length}
                            </span>}
                        </Link>
                    </li>}

                    <li>
                        <Link href='/'>
                            Products
                        </Link>
                    </li>

                    {status !== 'authenticated' ?
                        <li>
                            <Link href='/signin'>
                                Sign In
                            </Link>
                        </li> :
                        <li>
                            <span onClick={() => {
                                signOut({ redirect: false }).then(() => {
                                    toast.success("Logged out successfully.")
                                    router.push("/signin");
                                });
                            }}>
                                Sign out
                            </span>
                        </li>
                    }

                </ul>
            </nav>
        </div >
    )
}


export default Navbar