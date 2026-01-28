import React from 'react'

const RestaurantFooter = () => {
  return (
    <footer className='bg-gray-900 text-white py-12 shadow-2xl'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
                {/* Brand */}
                <div>
                    <h3 className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-2'>
                        FoodHub
                    </h3>
                    <p className='text-gray-400 text-sm'>Delivering delicious food to your doorstep</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className='font-semibold text-white mb-4'>Quick Links</h4>
                    <ul className='space-y-2 text-gray-400 text-sm'>
                        <li><a href='#' className='hover:text-orange-500 transition'>Home</a></li>
                        <li><a href='#' className='hover:text-orange-500 transition'>About Us</a></li>
                        <li><a href='#' className='hover:text-orange-500 transition'>Menu</a></li>
                        <li><a href='#' className='hover:text-orange-500 transition'>Contact</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className='font-semibold text-white mb-4'>Support</h4>
                    <ul className='space-y-2 text-gray-400 text-sm'>
                        <li><a href='#' className='hover:text-orange-500 transition'>Help Center</a></li>
                        <li><a href='#' className='hover:text-orange-500 transition'>Privacy Policy</a></li>
                        <li><a href='#' className='hover:text-orange-500 transition'>Terms & Conditions</a></li>
                        <li><a href='#' className='hover:text-orange-500 transition'>FAQ</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className='font-semibold text-white mb-4'>Contact Us</h4>
                    <ul className='space-y-2 text-gray-400 text-sm'>
                        <li>📞 +1 (555) 123-4567</li>
                        <li>📧 support@foodhub.com</li>
                        <li>📍 123 Food Street, NY 10001</li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className='border-t border-gray-700 pt-8'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <p className='text-gray-400 text-sm'>© 2024 FoodHub. All rights reserved.</p>
                    <div className='flex gap-4 mt-4 md:mt-0'>
                        <a href='#' className='text-gray-400 hover:text-orange-500 transition'>Facebook</a>
                        <a href='#' className='text-gray-400 hover:text-orange-500 transition'>Twitter</a>
                        <a href='#' className='text-gray-400 hover:text-orange-500 transition'>Instagram</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default RestaurantFooter