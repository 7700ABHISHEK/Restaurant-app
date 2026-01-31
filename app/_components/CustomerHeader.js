'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const CustomerHeader = ({ cartData }) => {
    const [cartNumber, setCartNumber] = useState(0);

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const cart = JSON.parse(storedCart);
            setCartNumber(cart.length);
        }
    }, []);

    // Handle cart updates when cartData changes
    useEffect(() => {
        if (cartData && cartData._id) {
            addToCart(cartData);
        }
    }, [cartData]);

    const addToCart = (item) => {
        // STEP 1: Get the current cart from browser storage
        let cart = [];
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }

        // STEP 2: Check if cart already has items from a DIFFERENT restaurant
        const hasItemsInCart = cart.length > 0;
        
        if (hasItemsInCart) {
            const firstItemRestaurantId = cart[0].userId;
            const newItemRestaurantId = item.userId;
            const isDifferentRestaurant = firstItemRestaurantId !== newItemRestaurantId;

            if (isDifferentRestaurant) {
                // Ask user: Do you want to replace old items with new restaurant items?
                const userClickedOK = window.confirm(
                    'Your cart contains items from another restaurant. Do you want to clear the cart and add items from this restaurant?'
                );
                
                if (userClickedOK) {
                    // User said YES - Remove all old items and add this new item
                    cart = [{ ...item, quantity: 1 }];
                    setCartNumber(1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                } 
                // User said NO - Do nothing, keep old cart as it is
                
                return; // Stop here, don't continue
            }
        }

        // STEP 3: Same restaurant OR empty cart - Add the item normally
        
        // Check if this exact item is already in cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem._id === item._id);

        if (existingItemIndex !== -1) {
            // Item already exists - Just increase the quantity by 1
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
            setCartNumber(cart.length);
        } else {
            // Brand new item - Add it to cart with quantity 1
            cart.push({ ...item, quantity: 1 });
            setCartNumber(cart.length);
        }

        // STEP 4: Save the updated cart back to browser storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                        <span>🎉 Free delivery on orders above $50</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/help" className="hover:underline">Help</Link>
                        <Link href="/partner" className="hover:underline">Partner with us</Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img
                            width={50}
                            height={50}
                            src='/fast-food.jpg'
                            alt="Restaurant Logo"
                            className="rounded-md"
                        />
                        <div className="hidden lg:block">
                            <h1 className="text-2xl font-bold text-gray-800">FoodHub</h1>
                            <p className="text-xs text-gray-500">Delicious food delivered</p>
                        </div>
                    </Link>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-6">
                        <Link href="/offers" className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors group">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                            </svg>
                            <span className="text-sm font-medium">Offers</span>
                        </Link>

                        <Link href="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors group relative">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-sm font-medium">Cart</span>
                            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{cartNumber}</span>
                        </Link>

                        <Link href="/orders" className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors group">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="text-sm font-medium">Orders</span>
                        </Link>

                        <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-500 transition-colors group">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-sm font-medium">Profile</span>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 text-gray-600 hover:text-orange-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-8 overflow-x-auto py-3 scrollbar-hide">
                        {['🍕 Pizza', '🍔 Burgers', '🍜 Noodles', '🍱 Asian', '🌮 Mexican', '🍰 Desserts', '☕ Beverages', '🥗 Healthy'].map((category) => (
                            <button
                                key={category}
                                className="text-sm font-medium text-gray-600 hover:text-orange-500 whitespace-nowrap transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default CustomerHeader
