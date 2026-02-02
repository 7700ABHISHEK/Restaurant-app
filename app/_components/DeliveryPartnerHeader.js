'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const DeliveryPartnerHeader = () => {
    const [deliveryPartner, setDeliveryPartner] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const partner = localStorage.getItem('deliveryPartner')
        if (partner) {
            setDeliveryPartner(JSON.parse(partner).result)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('deliveryPartner')
        router.push('/delivery-auth/login')
    }

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold text-blue-600">🚚 Delivery Partner</h1>
                        {deliveryPartner && (
                            <span className="text-sm text-gray-600">
                                Welcome, {deliveryPartner.name}
                            </span>
                        )}
                    </div>
                    <nav className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/delivery/dashboard')}
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default DeliveryPartnerHeader
