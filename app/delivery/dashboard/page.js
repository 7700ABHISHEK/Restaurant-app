'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const DeliveryDashboard = () => {
    const [deliveryPartner, setDeliveryPartner] = useState(null)
    const [orders, setOrders] = useState([])
    const [isAvailable, setIsAvailable] = useState(true)
    const [activeTab, setActiveTab] = useState('available')
    const router = useRouter()

    useEffect(() => {
        const partner = localStorage.getItem('deliveryPartner')
        if (!partner) {
            router.push('/delivery-auth/login')
            return
        }
        const partnerData = JSON.parse(partner)
        setDeliveryPartner(partnerData.result)
        setIsAvailable(partnerData.result.isAvailable)
        loadOrders(partnerData.result._id)
    }, [router])

    const loadOrders = async (partnerId) => {
        try {
            // Fetch orders assigned to this delivery partner and available orders
            const response = await fetch(`/api/delivery/orders?deliveryPartnerId=${partnerId}`)
            const data = await response.json()
            
            if (data.success) {
                // Transform orders to match the UI format
                const transformedOrders = data.orders.map(order => ({
                    _id: order._id,
                    orderNumber: `#ORD${order._id.slice(-6).toUpperCase()}`,
                    restaurantName: order.restaurant_id?.name || 'Restaurant',
                    restaurantAddress: order.restaurant_id?.address || '',
                    customerName: order.customer_id?.name || 'Customer',
                    customerAddress: order.customer_id?.address || 'Address not available',
                    customerPhone: order.customer_id?.phone || 'N/A',
                    items: order.foodItems.map(item => `Item x${item.quantity}`),
                    amount: order.amount,
                    distance: '2.5 km', // You can calculate this based on coordinates if available
                    status: order.status === 'confirm' || order.status === 'preparing' ? 'ready_for_pickup' : order.status,
                    estimatedTime: '15 min',
                    originalStatus: order.status
                }))
                setOrders(transformedOrders)
            }
        } catch (error) {
            console.error('Error loading orders:', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('deliveryPartner')
        router.push('/delivery-auth/login')
    }

    const toggleAvailability = () => {
        setIsAvailable(!isAvailable)
    }

    const acceptOrder = async (orderId) => {
        try {
            const response = await fetch('/api/delivery/orders', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId,
                    status: 'picked_up',
                    deliveryPartnerId: deliveryPartner._id
                })
            })
            
            const data = await response.json()
            
            if (data.success) {
                alert(`Order ${orderId} accepted!`)
                setOrders(orders.map(order => 
                    order._id === orderId ? { ...order, status: 'picked_up' } : order
                ))
            } else {
                alert('Failed to accept order')
            }
        } catch (error) {
            console.error('Error accepting order:', error)
            alert('Error accepting order')
        }
    }

    const completeDelivery = async (orderId) => {
        try {
            const response = await fetch('/api/delivery/orders', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderId,
                    status: 'delivered',
                    deliveryPartnerId: deliveryPartner._id
                })
            })
            
            const data = await response.json()
            
            if (data.success) {
                alert(`Order ${orderId} delivered successfully!`)
                setOrders(orders.filter(order => order._id !== orderId))
                // Reload orders to update stats
                loadOrders(deliveryPartner._id)
            } else {
                alert('Failed to complete delivery')
            }
        } catch (error) {
            console.error('Error completing delivery:', error)
            alert('Error completing delivery')
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'ready_for_pickup':
                return 'bg-yellow-100 text-yellow-800'
            case 'picked_up':
                return 'bg-blue-100 text-blue-800'
            case 'delivered':
                return 'bg-green-100 text-green-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    if (!deliveryPartner) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                {deliveryPartner.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">{deliveryPartner.name}</h2>
                                <p className="text-sm text-gray-600">{deliveryPartner.vehicleType} • {deliveryPartner.vehicleNumber}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">Available</span>
                                <button
                                    onClick={toggleAvailability}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        isAvailable ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            isAvailable ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Total Deliveries</p>
                                <p className="text-2xl font-bold text-gray-800">{deliveryPartner.totalDeliveries}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Active Orders</p>
                                <p className="text-2xl font-bold text-gray-800">{deliveryPartner.currentOrders}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Rating</p>
                                <p className="text-2xl font-bold text-gray-800">{deliveryPartner.rating} ⭐</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Today's Earnings</p>
                                <p className="text-2xl font-bold text-gray-800">₹850</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex gap-4 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('available')}
                            className={`px-6 py-3 font-semibold transition-all ${
                                activeTab === 'available'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-500'
                            }`}
                        >
                            Available Orders ({orders.filter(o => o.status === 'ready_for_pickup').length})
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`px-6 py-3 font-semibold transition-all ${
                                activeTab === 'active'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-blue-500'
                            }`}
                        >
                            Active Deliveries ({orders.filter(o => o.status === 'picked_up').length})
                        </button>
                    </div>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                    {orders.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-12 text-center">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders available</h3>
                            <p className="text-gray-600">New delivery requests will appear here</p>
                        </div>
                    ) : (
                        orders
                            .filter(order => 
                                activeTab === 'available' 
                                    ? order.status === 'ready_for_pickup' 
                                    : order.status === 'picked_up'
                            )
                            .map((order) => (
                                <div key={order._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{order.restaurantName}</h3>
                                            <p className="text-sm text-gray-500">{order.orderNumber}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                                            {order.status === 'ready_for_pickup' ? 'Ready for Pickup' : 'In Transit'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Customer</p>
                                            <p className="font-semibold text-gray-800">{order.customerName}</p>
                                            <p className="text-sm text-gray-600">{order.customerPhone}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                                            <p className="text-sm text-gray-800">{order.customerAddress}</p>
                                        </div>
                                    </div>

                                    <div className="mb-4 pb-4 border-b border-gray-100">
                                        <p className="text-sm text-gray-500 mb-2">Items:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {order.items.map((item, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-6">
                                            <div>
                                                <p className="text-sm text-gray-500">Distance</p>
                                                <p className="font-bold text-gray-800">{order.distance}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Amount</p>
                                                <p className="font-bold text-blue-600">₹{order.amount}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Est. Time</p>
                                                <p className="font-bold text-gray-800">{order.estimatedTime}</p>
                                            </div>
                                        </div>

                                        {order.status === 'ready_for_pickup' ? (
                                            <button
                                                onClick={() => acceptOrder(order._id)}
                                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Accept Order
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => completeDelivery(order._id)}
                                                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Mark as Delivered
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default DeliveryDashboard
