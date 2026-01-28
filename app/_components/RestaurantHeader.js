'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const RestaurantHeader = () => {
    const [detail, setDetail] = useState(undefined);
    const router = useRouter();
    const pathName = usePathname();

    const handleLogin = () => {
        localStorage.removeItem("user");
        router.push("/restaurant")
    }

    useEffect(() => {
        const data = localStorage.getItem('user');
        if (!data && pathName === '/restaurant/dashboard') {
            router.push('/restaurant');
        } else if (data && pathName === '/restaurant') {
            router.push("/restaurant/dashboard");
        } else {
            setDetail(JSON.parse(data));
        }

    }, [])

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                            <Image
                                width={50}
                                height={50}
                                src='/fast-food.jpg'
                                alt="Restaurant Logo"
                                className="rounded-md"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                FoodHub
                            </h1>
                            <p className="text-xs text-gray-500">Delicious Delivery</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        <Link
                            href='/Home'
                            className="px-4 py-2 text-gray-700 font-medium hover:text-orange-600 hover:bg-orange-50 rounded-lg transition duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            href='/About'
                            className="px-4 py-2 text-gray-700 font-medium hover:text-orange-600 hover:bg-orange-50 rounded-lg transition duration-300"
                        >
                            About
                        </Link>
                        {/* <Link
                            href='/Login'
                            className="px-4 py-2 text-gray-700 font-medium hover:text-orange-600 hover:bg-orange-50 rounded-lg transition duration-300"
                        >
                            Login
                        </Link> */}
                        <Link
                            href='/Profile'
                            className="px-4 py-2 text-gray-700 font-medium hover:text-orange-600 hover:bg-orange-50 rounded-lg transition duration-300"
                        >
                            Profile
                        </Link>
                    </nav>

                    <div className="hidden md:block">
                        <button onClick={handleLogin} className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition duration-300 transform hover:scale-105">
                            {
                                detail ? "Logout" : "Login"
                            }
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-gray-700 hover:text-orange-600 transition duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default RestaurantHeader