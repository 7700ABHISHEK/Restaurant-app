'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RestaurantLogin = () => {

  const [input, setInput] = useState({
    email: '', password: ''
  })
  const router = useRouter();

  const handleChange = (e) => {
    setInput({...input, [e.target.id]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    input.email = input.email.toLowerCase();

    const res = await fetch('/api/restaurant/login', {
      method: 'POST',
      headers:{
        'content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })

    const data = await res.json();

    if(data.result === true){

      alert("Welcome back")

      localStorage.setItem("user", JSON.stringify(data));
      router.push('/restaurant/dashboard');
    }

  }
  return (
    <div className="flex items-center justify-center p-2 sm:p-4 min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Restaurant Login</h1>
            <p className="text-xs sm:text-sm text-gray-600">Sign in to your restaurant account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                placeholder="your@email.com"
                required
                value={input.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-50 hover:bg-white"
                placeholder="••••••••"
                required
                value={input.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 text-sm sm:text-base rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RestaurantLogin