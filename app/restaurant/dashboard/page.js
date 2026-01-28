'use client'
import FoodItemList from '@/app/_components/FoodItemList';
import Fooditems from '@/app/_components/FoodItems';
import RestaurantHeader from '@/app/_components/RestaurantHeader'
import { useState } from 'react'

const dashboard = () => {
  const [showItem, setShowItem] = useState(false);
  
  return (
    <div className="min-h-screen">
      <RestaurantHeader />
      
      {/* Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Header with Stats */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Restaurant Dashboard
              </h1>
              <p className="text-gray-600">Manage your menu items and track your inventory</p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-4">
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[120px]">
                <p className="text-sm text-gray-500 mb-1">Total Items</p>
                <p className="text-2xl font-bold text-orange-600">24</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-4 min-w-[120px]">
                <p className="text-sm text-gray-500 mb-1">Categories</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-md p-2 inline-flex gap-2">
            <button 
              onClick={() => setShowItem(false)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                !showItem 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              View All Items
            </button>
            
            <button 
              onClick={() => setShowItem(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                showItem 
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Item
            </button>
          </div>
        </div>

        {/* Content Area with Smooth Transition */}
        <div className="transition-all duration-500 ease-in-out">
          {showItem ? (
            <div className="animate-fadeIn">
              <Fooditems setShowItem={setShowItem} />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <FoodItemList setShowItem={setShowItem} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default dashboard