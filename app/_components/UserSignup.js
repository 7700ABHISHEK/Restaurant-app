import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const UserSignup = () => {

    const [input, setInput] = useState({
        name: '', email: '', phone: '', password: '', cpassword: '', address: '', city: '', state: ''
    })

    const router = useRouter();

    useEffect(() => {
        const customer = localStorage.getItem("customer");
        if (customer) {
            router.push("/profile");
        }
    }, [router]);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.name.trim() || !input.email.trim() || !input.phone || !input.password.trim() || !input.cpassword.trim() || !input.address.trim()) {
            alert("All fields must be filled...")
            return
        }

        if (input.password !== input.cpassword) {
            alert("password and confirm password should be same...");
            return
        }

        input.email = input.email.toLowerCase();

        let response = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })

        response = await response.json()

        if (response.success === true) {
            alert("User Registered Successfully....");
            router.push("/user-auth/login");
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-4 px-2 sm:px-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row lg:h-[90vh]">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-red-600 p-8 xl:p-12 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -ml-48 -mb-48"></div>

                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            🍔 FoodHub
                        </h1>
                        <p className="text-orange-100 text-lg">
                            Your favorite meals, delivered fresh to your doorstep
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Fast Delivery</h3>
                                <p className="text-orange-100">Get your food in 30 minutes or less</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Best Prices</h3>
                                <p className="text-orange-100">Affordable meals from top restaurants</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-white bg-opacity-20 rounded-full p-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-lg">Quality Food</h3>
                                <p className="text-orange-100">Only the best restaurants partner with us</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center sm:overflow-y-none max-h-screen lg:max-h-full">
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                            Create Account
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            Join thousands of food lovers today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="John Doe"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="+1 234 567 8900"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="you@example.com"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="cpassword" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Confirm
                                </label>
                                <input
                                    id="cpassword"
                                    name="confirm-password"
                                    type="password"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="city" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="Ex: Surat"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    required
                                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                    placeholder="Ex: Gujarat"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                Delivery Address
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                rows="2"
                                required
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition resize-none"
                                placeholder="123 Main St, Apt 4B, City, State, ZIP"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Create Account
                        </button>

                        <div className="text-center pt-1 sm:pt-2">
                            <p className="text-xs sm:text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link href="/user-auth/login" className="font-semibold text-orange-600 hover:text-orange-700">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserSignup
