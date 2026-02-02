'use client'
import React, { useState, useEffect } from 'react'
import CustomerHeader from '../_components/CustomerHeader'
import CustomerFooter from '../_components/CustomerFooter'
import { useRouter } from 'next/navigation'

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('all') // all, ongoing, completed
    const router = useRouter()

    useEffect(() => {
        loadOrders()
    }, [])

    const loadOrders = async () => {
        try {
            const customer = JSON.parse(localStorage.getItem('customer'))
            if (!customer) {
                router.push('/user-auth/login')
                return
            }

            const order = JSON.parse(localStorage.getItem('order'));

            if (order && order.foodItems) {  // ← CHANGED: foodItems instead of foodItemId
                // Extract just the IDs for the API call
                const foodItemIds = order.foodItems.map(item => item.foodItemId).join(',');

                const response = await fetch(`/api/order/getOrder?foodItemIds=${foodItemIds}`);
                const data = await response.json();

                if (data.success) {
                    // Create a map of quantities by food item ID
                    const quantityMap = {};
                    order.foodItems.forEach(item => {
                        quantityMap[item.foodItemId] = item.quantity;
                    });

                    const orderData = {
                        _id: Date.now().toString(),
                        restaurantName: data.result[0]?.restaurantName || 'Restaurant',
                        orderNumber: `#ORD${Date.now().toString().slice(-6)}`,
                        status: order.status === 'confirm' ? 'preparing' : order.status,
                        // ✅ NEW: Show actual quantities
                        items: data.result.map(item =>
                            `${item.name} x${quantityMap[item._id] || 1}`
                        ),
                        date: new Date().toISOString(),
                        estimatedTime: '30-40 min',
                        total: parseFloat(order.amount),
                        image: data.result[0]?.imagePath || '/fast-food.jpg',
                        foodItems: data.result.map(item => ({
                            ...item,
                            quantity: quantityMap[item._id] || 1  // Add quantity to each item
                        }))
                    };

                    setOrders([orderData]);
                }
            }

            setLoading(false)
        } catch (error) {
            console.error('Error loading orders:', error)
            setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'delivered':
                return 'bg-green-100 text-green-800'
            case 'on_the_way':
                return 'bg-blue-100 text-blue-800'
            case 'preparing':
                return 'bg-yellow-100 text-yellow-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return '✓'
            case 'on_the_way':
                return '🚚'
            case 'preparing':
                return '👨‍🍳'
            case 'cancelled':
                return '✗'
            default:
                return '📦'
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'delivered':
                return 'Delivered'
            case 'on_the_way':
                return 'On the Way'
            case 'preparing':
                return 'Preparing'
            case 'cancelled':
                return 'Cancelled'
            default:
                return 'Pending'
        }
    }

    const filterOrders = () => {
        if (activeTab === 'all') return orders
        if (activeTab === 'ongoing') return orders.filter(o => ['preparing', 'on_the_way'].includes(o.status))
        if (activeTab === 'completed') return orders.filter(o => ['delivered', 'cancelled'].includes(o.status))
        return orders
    }

    const filteredOrders = filterOrders()

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <CustomerHeader />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading your orders...</p>
                    </div>
                </main>
                <CustomerFooter />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <CustomerHeader />

            <main className="flex-1 bg-gradient-to-b from-orange-50 to-white py-4 sm:py-8">
                <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
                    {/* Page Header */}
                    <div className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Orders</h1>
                        <p className="text-sm sm:text-base text-gray-600">Track and manage your food orders</p>
                    </div>

                    {/* Tabs */}
                    <div className="mb-6 sm:mb-8">
                        <div className="flex gap-2 sm:gap-4 border-b border-gray-200 overflow-x-auto">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base whitespace-nowrap transition-all ${activeTab === 'all'
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-600 hover:text-orange-500'
                                    }`}
                            >
                                All Orders ({orders.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('ongoing')}
                                className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base whitespace-nowrap transition-all ${activeTab === 'ongoing'
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-600 hover:text-orange-500'
                                    }`}
                            >
                                Ongoing ({orders.filter(o => ['preparing', 'on_the_way'].includes(o.status)).length})
                            </button>
                            <button
                                onClick={() => setActiveTab('completed')}
                                className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold text-sm sm:text-base whitespace-nowrap transition-all ${activeTab === 'completed'
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-600 hover:text-orange-500'
                                    }`}
                            >
                                Completed ({orders.filter(o => ['delivered', 'cancelled'].includes(o.status)).length})
                            </button>
                        </div>
                    </div>

                    {/* Orders List */}
                    {filteredOrders.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
                            <div className="text-6xl sm:text-8xl mb-4">📦</div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No orders found</h2>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">
                                {activeTab === 'all'
                                    ? "You haven't placed any orders yet"
                                    : `No ${activeTab} orders at the moment`
                                }
                            </p>
                            <button
                                onClick={() => router.push('/')}
                                className="inline-block px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                Start Ordering
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4 sm:space-y-6">
                            {filteredOrders.map((order) => (
                                <div
                                    key={order._id}
                                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-4 sm:p-6">
                                        {/* Order Header */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={order.image}
                                                    alt={order.restaurantName}
                                                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{order.restaurantName}</h3>
                                                    <p className="text-xs sm:text-sm text-gray-500">{order.orderNumber}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(order.status)} flex items-center gap-1.5`}>
                                                <span className="text-base">{getStatusIcon(order.status)}</span>
                                                {getStatusText(order.status)}
                                            </span>
                                        </div>

                                        {/* Order Items */}
                                        <div className="mb-4 pb-4 border-b border-gray-100">
                                            <p className="text-sm text-gray-600 mb-2">Items:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {order.items.map((item, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm"
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Order Details */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
                                                <div>
                                                    <p className="text-gray-500 mb-1">Order Date</p>
                                                    <p className="font-semibold text-gray-800">{new Date(order.date).toLocaleDateString()}</p>
                                                </div>
                                                {['preparing', 'on_the_way'].includes(order.status) && (
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Estimated Time</p>
                                                        <p className="font-semibold text-orange-600">{order.estimatedTime}</p>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-gray-500 mb-1">Total Amount</p>
                                                    <p className="font-bold text-lg text-orange-600">₹{order.total.toFixed(2)}</p>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                {order.status === 'delivered' && (
                                                    <button className="flex-1 sm:flex-none px-4 py-2 bg-orange-500 text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                                        Reorder
                                                    </button>
                                                )}
                                                <button className="flex-1 sm:flex-none px-4 py-2 border-2 border-orange-500 text-orange-500 text-sm font-semibold rounded-lg hover:bg-orange-50 transition-colors">
                                                    View Details
                                                </button>
                                            </div>
                                        </div>

                                        {/* Progress Bar for Ongoing Orders */}
                                        {['preparing', 'on_the_way'].includes(order.status) && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Order Progress</span>
                                                    <span className="text-xs sm:text-sm font-medium text-orange-600">
                                                        {order.status === 'preparing' ? '50%' : '80%'}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: order.status === 'preparing' ? '50%' : '80%' }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between mt-3 text-xs text-gray-500">
                                                    <span className={order.status === 'preparing' ? 'text-orange-600 font-semibold' : ''}>
                                                        ✓ Order Placed
                                                    </span>
                                                    <span className={order.status === 'preparing' ? 'text-orange-600 font-semibold' : ''}>
                                                        {order.status === 'preparing' ? '👨‍🍳 Preparing' : '✓ Prepared'}
                                                    </span>
                                                    <span className={order.status === 'on_the_way' ? 'text-orange-600 font-semibold' : ''}>
                                                        {order.status === 'on_the_way' ? '🚚 On the Way' : 'Out for Delivery'}
                                                    </span>
                                                    <span>Delivered</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Help Section */}
                    <div className="mt-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold mb-1">Need Help with Your Order?</h3>
                                <p className="text-sm sm:text-base text-orange-100">Our support team is here to assist you 24/7</p>
                            </div>
                            <button className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <CustomerFooter />
        </div>
    )
}

export default OrdersPage
