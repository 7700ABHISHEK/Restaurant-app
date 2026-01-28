'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
const RestaurantSignup = () => {
    const [input, setInput] = useState({
        name: '', email: '', password: '', cpassword: '', address: '', number: ''
    });

    const router = useRouter();

    const handleChange = (e) => {
        setInput({...input, [e.target.id]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

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
        // console.log(data)

        if(data.result === true){
            alert("Restaurant registered suceessfully...");

            localStorage.setItem('user', JSON.stringify(data));
            router.push("/restaurant/dashboard");
        }
    }

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Restaurant Account</h1>
                        <p className="text-gray-600">Register your restaurant with us</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Restaurant Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={input.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                placeholder="Your restaurant name" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                id="email"
                                value={input.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                placeholder="your@email.com" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={input.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="cpassword" className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                            <input 
                                type="password" 
                                id="cpassword"
                                value={input.cpassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                            <input 
                                type="text" 
                                id="address" 
                                value={input.address}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                placeholder="Street address" 
                                required 
                            />
                        </div>

                        <div>
                            <label htmlFor="number" className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                            <input 
                                type="tel" 
                                id="number"
                                value={input.number}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white" 
                                placeholder="+1 (555) 000-0000" 
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
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