'use client'
import React, { useState, useEffect } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import CustomerFooter from '../_components/CustomerFooter'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const CartPage = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter();

    console.log(cartItems)

    useEffect(() => {
        loadCart()
    }, [])

    const loadCart = () => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
        setLoading(false)
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return

        const updatedCart = cartItems.map(item =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const removeItem = (itemId) => {
        const updatedCart = cartItems.filter(item => item._id !== itemId)
        setCartItems(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const clearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            setCartItems([])
            localStorage.removeItem('cart')
        }
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }

    const deliveryFee = 5
    const taxRate = 0.08
    const subtotal = calculateSubtotal()
    const tax = subtotal * taxRate
    const total = subtotal + deliveryFee + tax

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <CustomerHeader />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading cart...</p>
                    </div>
                </main>
                <CustomerFooter />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <CustomerHeader />

            <main className="flex-1 bg-gray-50 py-4 sm:py-8">
                <div className="container mx-auto px-3 sm:px-4 ">
                    {/* Page Header */}
                    <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Shopping Cart</h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1">
                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                            </p>
                        </div>
                        <div>
                            {
                                cartItems.length > 0 ?
                                    <button className='bg-orange-600 py-1.5 px-3 sm:py-2 sm:px-4 rounded-2xl text-white text-sm sm:text-base' onClick={() => router.push(`/explore/${cartItems[0].restaurantName}?id=${cartItems[0].userId}`)}>Back</button>
                                    :
                                    <button className='bg-orange-600 py-1.5 px-3 sm:py-2 sm:px-4 rounded-2xl text-white text-sm sm:text-base' onClick={() => router.push('/')}>Back</button>
                            }
                        </div>
                    </div>

                    {cartItems.length === 0 ? (
                        /* Empty Cart */
                        <div className="bg-white rounded-lg shadow-md p-6 sm:p-12 text-center">
                            <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">🛒</div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Add some delicious items to get started!</p>
                            <Link
                                href="/"
                                className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-orange-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Browse Restaurants
                            </Link>
                        </div>
                    ) : (
                        /* Cart with Items */
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                                {/* Clear Cart Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={clearCart}
                                        className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                                    >
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Clear Cart
                                    </button>
                                </div>

                                {/* Cart Items List */}
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="flex gap-2 sm:gap-4">
                                            {/* Item Image */}
                                            <div className="shrink-0">
                                                <img
                                                    src={item.imagePath}
                                                    alt={item.name}
                                                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-2 gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">{item.name}</h3>
                                                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{item.description || 'Delicious food item'}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item._id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                                    >
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-3 sm:mt-4 gap-2">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
                                                        >
                                                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <span className="text-base sm:text-lg font-semibold text-gray-800 w-6 sm:w-8 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-colors"
                                                        >
                                                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        <p className="text-base sm:text-lg md:text-xl font-bold text-orange-600">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${item.price.toFixed(2)} each
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:sticky lg:top-24">
                                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Order Summary</h2>

                                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                        <div className="flex justify-between text-sm sm:text-base text-gray-600">
                                            <span>Subtotal</span>
                                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm sm:text-base text-gray-600">
                                            <span>Delivery Fee</span>
                                            <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm sm:text-base text-gray-600">
                                            <span>Tax (8%)</span>
                                            <span className="font-semibold">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 sm:pt-3">
                                            <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800">
                                                <span>Total</span>
                                                <span className="text-orange-600">${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Promo Code */}
                                    <div className="mb-3 sm:mb-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Promo code"
                                                className="flex-1 px-3 py-2 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                                            />
                                            <button className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors whitespace-nowrap">
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <button className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors mb-2 sm:mb-3">
                                        Proceed to Checkout
                                    </button>

                                    {/* Continue Shopping */}
                                    <Link
                                        href="/"
                                        className="block text-center text-sm sm:text-base text-orange-500 hover:text-orange-600 font-medium"
                                    >
                                        Continue Shopping
                                    </Link>

                                    {/* Delivery Info */}
                                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                                        <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <div>
                                                <p className="font-semibold text-gray-800">Free delivery on orders above $50</p>
                                                <p className="text-xs mt-1">Your order qualifies for free delivery!</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <CustomerFooter />
        </div>
    )
}

export default CartPage
