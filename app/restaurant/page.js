'use client'

import React, { useState } from 'react'
import RestaurantSignup from '../_components/RestaurantSignup'
import RestaurantLogin from '../_components/RestaurantLogin'
import RestaurantHeader from '../_components/RestaurantHeader'
import RestaurantFooter from '../_components/RestaurantFooter'

const page = () => {

    const [login, setLogin] = useState(true)

    return (
        <div className='flex flex-col min-h-screen'>
            <RestaurantHeader />
            
            {/* Hero Banner */}
            <div className='bg-linear-to-r from-orange-50 to-red-50 py-12 border-b border-orange-100'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='text-center'>
                        <h1 className='text-5xl md:text-6xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4'>
                            Welcome to FoodHub
                        </h1>
                        <p className='text-xl text-gray-600 mb-2'>Fast, Fresh, and Delicious Food Delivery</p>
                        <p className='text-gray-500'>Order your favorite meals and get them delivered in minutes</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className='flex-1'>
                <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                    <div className='bg-white rounded-2xl shadow-lg p-8'>
                        
                        <div className='mb-8'>
                            {login ? <RestaurantLogin /> : <RestaurantSignup />}
                        </div>

                        <div className='flex justify-center'>
                            <button 
                                className='text-orange-600 font-semibold px-4 py-2 rounded-lg hover:bg-orange-50 transition duration-300' 
                                onClick={() => { setLogin(!login) }}
                            >
                                {login ? "New here? Create an account" : "Already have an account? Sign in"}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <RestaurantFooter />
        </div>
    )
}

export default page
