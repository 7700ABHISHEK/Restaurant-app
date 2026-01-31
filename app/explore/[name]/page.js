'use client'
import React, { useEffect, useState } from 'react'
import CustomerHeader from '@/app/_components/CustomerHeader'
import { useRouter } from 'next/navigation';

const page = (props) => {
    const [restaurantDetails, setRestaurantDetails] = useState({});
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [restaurantName, setRestaurantName] = useState('');
    const [cartData, setCartData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        loadRestaurantDetails();
        getName();
    }, [])
    
    console.log(restaurantDetails)

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

    const getName = async () => {
        let {name} = await props.params
        name = decodeURI(name)
        setRestaurantName(name);
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
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading restaurant details...</p>
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
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
                    <div className="container mx-auto px-4 flex justify-between">
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
                                <img
                                    src='/fast-food.jpg'
                                    alt={restaurantDetails.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold mb-2">{restaurantDetails.name}</h1>
                                <div className="flex items-center gap-4 text-sm opacity-90">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {restaurantDetails.city}, {restaurantDetails.state}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        {restaurantDetails.number}
                                    </span>
                                </div>
                                <p className="mt-3 text-white/90">{restaurantDetails.address}</p>
                                <div className="mt-4 flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-300">★★★★☆</span>
                                        <span className="ml-1">4.2</span>
                                    </div>
                                    <span>•</span>
                                    <span>30-40 mins</span>
                                    <span>•</span>
                                    <span>Free delivery above $50</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className='bg-white text-black px-3 py-2 rounded-2xl cursor-pointer' onClick={() => router.push("/")}>Back</button>
                        </div>
                    </div>
                </div>

                {/* Menu Section */}
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Menu</h2>
                        <p className="text-gray-600">{foodItems.length} items available</p>
                    </div>

                    {foodItems.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No items available</h3>
                            <p className="text-gray-500">This restaurant hasn't added any menu items yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {foodItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
                                    {/* Food Image */}
                                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                                        <img
                                            src={item.imagePath}
                                            alt={item.name}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
                                            <span className="text-orange-600 font-bold">₹{item.price}</span>
                                        </div>
                                    </div>

                                    {/* Food Details */}
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                                        {/* Add to Cart Button */}
                                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2" 
                                        onClick={() => addToCart(item)} >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="container mx-auto px-4 pb-12">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Restaurant Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Contact Details</h4>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        {restaurantDetails.email}
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        {restaurantDetails.number}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                                <p className="text-gray-600 flex items-start gap-2">
                                    <svg className="w-5 h-5 text-orange-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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