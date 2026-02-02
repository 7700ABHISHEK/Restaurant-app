'use client'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const DeliveryPartnerLogin = () => {
    const [input, setInput] = useState({
        email: '', password: ''
    })
    const router = useRouter();

    useEffect(() => {
        const deliveryPartner = localStorage.getItem("deliveryPartner");
        if (deliveryPartner) {
            router.push("/delivery/dashboard");
        }
    }, [router]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = await fetch("/api/delivery/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })

        response = await response.json();
        if (response.success === true) {
            alert("Welcome back, Delivery Partner!");
            localStorage.setItem("deliveryPartner", JSON.stringify(response));
            router.push("/delivery/dashboard")
        } else {
            alert(response.error || "Login failed. Please check your credentials.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4 px-2 sm:px-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row lg:h-[90vh]">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 xl:p-12 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            🚚 Delivery Partner
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Join our delivery network and earn on your schedule
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Flexible Earnings</h3>
                                <p className="text-blue-100">Work when you want, earn what you deserve</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Reliable Support</h3>
                                <p className="text-blue-100">24/7 assistance for all delivery partners</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Quick Payouts</h3>
                                <p className="text-blue-100">Get paid instantly after each delivery</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                            Partner Login
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            Sign in to start delivering orders
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="you@example.com"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="••••••••"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-xs sm:text-sm">
                                <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Sign In
                        </button>

                        <div className="text-center pt-1 sm:pt-2">
                            <p className="text-xs sm:text-sm text-gray-600">
                                New delivery partner?{' '}
                                <Link href="/delivery-auth/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                                    Register Now
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeliveryPartnerLogin
