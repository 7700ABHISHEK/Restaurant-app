'use client'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '@/app/_components/CustomerHeader'
import { useRouter } from 'next/navigation';

const page = (props) => {
    const [restaurantDetails, setRestaurantDetails] = useState({});
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartData, setCartData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        loadRestaurantDetails();
    }, [])

    const loadRestaurantDetails = async () => {
        try {
            const { id } = await props.searchParams
            let response = await fetch(`/api/customer/${id}`);
            response = await response.json();

            if(response.success === true){
                setRestaurantDetails(response.details);
                setFoodItems(response.foodItems)
            }
        } catch (error) {
            console.error('Error loading restaurant details:', error);
        } finally {
            setLoading(false);
        }
    }

    const addToCart = (item) => {
        // Add restaurantId to the item
        setCartData({
            ...item, restaurantName: (restaurantDetails.name.toLowerCase())
        });
    }


    if (loading) {
        return (
            <>
                <CustomerHeader />
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-sm sm:text-base text-gray-600">Loading restaurant details...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <CustomerHeader cartData={cartData} />
            <div className="min-h-screen bg-gray-50">
                {/* Restaurant Header Banner */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 sm:py-6 md:py-8 lg:py-12">
                    <div className="container mx-auto px-3 sm:px-4">
                        {/* Back Button - Mobile Top */}
                        <div className="flex justify-end mb-3 sm:hidden">
                            <button 
                                className='bg-white text-orange-600 px-3 py-1.5 text-sm rounded-lg font-medium hover:bg-orange-50 transition-colors shadow-md' 
                                onClick={() => router.push("/")}
                            >
                                ← Back
                            </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div className="flex items-start gap-3 sm:gap-4 md:gap-6 flex-1">
                                {/* Restaurant Logo */}
                                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                    <img
                                        src='/fast-food.jpg'
                                        alt={restaurantDetails.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Restaurant Info */}
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 break-words">
                                        {restaurantDetails.name}
                                    </h1>
                                    
                                    {/* Location & Contact - Stacked on mobile */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 md:gap-4 text-xs sm:text-sm opacity-90 mb-2">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="truncate">{restaurantDetails.city}, {restaurantDetails.state}</span>
                                        </span>
                                        <span className="hidden sm:inline">•</span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            <span className="truncate">{restaurantDetails.number}</span>
                                        </span>
                                    </div>

                                    {/* Address - Hidden on very small screens */}
                                    <p className="hidden sm:block mt-2 md:mt-3 text-xs sm:text-sm text-white/90 line-clamp-2">
                                        {restaurantDetails.address}
                                    </p>

                                    {/* Rating & Info - Responsive layout */}
                                    <div className="mt-2 sm:mt-3 md:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
                                        <div className="flex items-center gap-1">
                                            <span className="text-yellow-300 text-sm sm:text-base">★★★★☆</span>
                                            <span className="ml-0.5 sm:ml-1 font-medium">4.2</span>
                                        </div>
                                        <span className="hidden xs:inline">•</span>
                                        <span className="hidden xs:inline whitespace-nowrap">30-40 mins</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span className="hidden sm:inline whitespace-nowrap">Free delivery above $50</span>
                                    </div>
                                </div>
                            </div>

                            {/* Back Button - Desktop */}
                            <div className="hidden sm:block">
                                <button 
                                    className='bg-white text-orange-600 px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-medium hover:bg-orange-50 transition-colors shadow-md whitespace-nowrap' 
                                    onClick={() => router.push("/")}
                                >
                                    ← Back
                                </button>
                            </div>
                        </div>

                        {/* Address - Mobile only */}
                        <div className="sm:hidden mt-3 pt-3 border-t border-white/20">
                            <p className="text-xs text-white/90 flex items-start gap-2">
                                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span>{restaurantDetails.address}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
                    <div className="mb-4 sm:mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Menu</h2>
                        <p className="text-sm sm:text-base text-gray-600">{foodItems.length} items available</p>
                    </div>

                    {foodItems.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-12 text-center">
                            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No items available</h3>
                            <p className="text-sm sm:text-base text-gray-500">This restaurant hasn't added any menu items yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                            {foodItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    {/* Food Image */}
                                    <div className="relative h-40 sm:h-44 md:h-48 bg-gray-200 overflow-hidden">
                                        <img
                                            src={item.imagePath}
                                            alt={item.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white px-2 sm:px-3 py-1 rounded-full shadow-md">
                                            <span className="text-orange-600 font-bold text-sm sm:text-base">₹{item.price}</span>
                                        </div>
                                    </div>

                                    {/* Food Details */}
                                    <div className="p-3 sm:p-4">
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1.5 sm:mb-2 line-clamp-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                                            {item.description}
                                        </p>

                                        {/* Add to Cart Button */}
                                        <button 
                                            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base" 
                                            onClick={() => addToCart(item)}
                                        >
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Restaurant Info Section */}
                <div className="container mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12">
                    <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Restaurant Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Contact Details</h4>
                                <div className="space-y-2 text-gray-600 text-xs sm:text-sm">
                                    <p className="flex items-start gap-2 break-all">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <span className="break-all">{restaurantDetails.email}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        {restaurantDetails.number}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Address</h4>
                                <p className="text-gray-600 flex items-start gap-2 text-xs sm:text-sm">
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>
                                        {restaurantDetails.address}<br />
                                        {restaurantDetails.city}, {restaurantDetails.state}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page