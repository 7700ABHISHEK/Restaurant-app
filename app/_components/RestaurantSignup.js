'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const RestaurantSignup = () => {
    const [input, setInput] = useState({
        name: '', email: '', password: '', cpassword: '', address: '', city: '', state: '', number: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(input)

        if(input.password !== input.cpassword){
            alert("password and confirm password should be matching...");
            return
        }

        input.email = input.email.toLowerCase();
        
        const res = await fetch('/api/restaurant/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(input)
        })
        const data = await res.json()
        console.log(data);

        if(data.result === true){
            alert("Restaurant registered suceessfully...");

            localStorage.setItem('user', JSON.stringify(data));
            router.push("/restaurant/dashboard");
        }
    }

    return (
        <div className="flex items-center justify-center p-2 sm:p-4 min-h-[calc(100vh-200px)]">
            <div className="w-full max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
                    <div className="text-center mb-3 sm:mb-4 md:mb-6">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-1">Create Restaurant Account</h1>
                        <p className="text-gray-600 text-xs sm:text-sm">Register your restaurant with us</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Restaurant Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    value={input.name}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="Your restaurant name" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    value={input.email}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="your@email.com" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    value={input.password}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="••••••••" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="cpassword" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="cpassword"
                                    value={input.cpassword}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="••••••••" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Address</label>
                                <input 
                                    type="text" 
                                    id="address" 
                                    value={input.address}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="Street address" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="number" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Contact Number</label>
                                <input 
                                    type="number" 
                                    id="number"
                                    value={input.number}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="+1 (555) 000-0000" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">City</label>
                                <input 
                                    type="text" 
                                    id="city" 
                                    value={input.city}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="Enter city" 
                                    required 
                                />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">State</label>
                                <input 
                                    type="text" 
                                    id="state" 
                                    value={input.state}
                                    onChange={handleChange}
                                    className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                    placeholder="Enter state" 
                                    required 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 text-sm sm:text-base rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
                        >
                            Create Account
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default RestaurantSignup