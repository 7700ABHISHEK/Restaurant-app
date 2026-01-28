'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const FoodItemList = ({ setShowItem }) => {

  const [foodItem, setFoodItem] = useState([]);
  const router = useRouter();

  useEffect(() => {
    showFoodItem();
  }, [])

  const showFoodItem = async () => {
    const userData = JSON.parse(localStorage.getItem("user"))
    const userId = userData.Response._id;
    let response = await fetch("/api/restaurant/food/" + userId, {
      method: "GET"
    })
    response = await response.json()
    // console.log(response)
    if (response.success) {
      setFoodItem(response.result);
    } else {
      alert("Add any item to show");
      return;
    }
  }

  const deleteFood = async (id) => {
    let response = await fetch("/api/restaurant/food/" + id , {
      method: "DELETE",
    })
    response = await response.json();
    console.log(response)
    if(response.success){
      alert("Item Deleted successfully...");
      showFoodItem(); // Refresh the list after deletion
    }
  }


  return (
    <div className="p-6 ">
      {/* Header with Actions */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Food Items</h1>
          <p className="text-gray-500 mt-1">Manage your restaurant menu items</p>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center gap-2" onClick={() => setShowItem(true)}>
          <span className="text-xl">+</span>
          Add New Item
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search food items..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>All Categories</option>
          <option>Pizza</option>
          <option>Burger</option>
          <option>Drinks</option>
        </select>
        <button className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {foodItem.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={item.imagePath} alt={item.name} width={48} height={48} className="object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">ID: #{item._id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 max-w-xs line-clamp-2">{item.description}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    {/* Edit button */}
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={() => router.push(`/restaurant/dashboard/${item._id}`)}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    {/* Delete button */}
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete" onClick={() => deleteFood(item._id)}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">1</span> to <span className="font-semibold">1</span> of <span className="font-semibold">1</span> items
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodItemList