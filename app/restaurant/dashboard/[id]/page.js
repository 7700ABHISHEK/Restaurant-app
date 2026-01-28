'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const updateFoodItem = () => {
    const [input, setInput] = useState({
        name: '', price: '', imagePath: '', description: ''
    })
    const { id } = useParams();

    const router = useRouter();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    }

    useEffect(() => {
        handleFoodLoad();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.name.trim() || !input.price || !input.imagePath.trim() || !input.description.trim()) {
            alert("Please fill all the details properly...");
            return
        }
        console.log(input);

        let res = await fetch(`/api/restaurant/food/edit/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(input)
        })

        const data = await res.json()

        if(data.success === true){
            alert("Item Updated Successfully....");
            router.push("/restaurant/dashboard");
        } else{
            alert("Error updating data...");
            return;
        }

    }

    const handleFoodLoad = async () => {
        try {
            let response = await fetch(`/api/restaurant/food/edit/${id}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await response.json()

            if(data.success === false){
                router.push("/restaurant/dashboard")
                return;
            }

            if (data.success === true) {
                console.log(data.result)
                setInput(data.result)
            }
        } catch (error) {
            console.log(error);
            alert("error loading food items...");
        }
    }

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Food Item</h2>
                        <p className="text-gray-600">Fill in the details to add a new item to your menu</p>
                    </div>
                    <button onClick={() => router.push('/restaurant/dashboard')}
                        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to List
                    </button>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-md p-8">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Food Name */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Food Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id='name'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="e.g., Margherita Pizza"
                                value={input.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Price ($) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                id='price'
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="e.g., 12.99"
                                value={input.price}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Image Path */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                ImageUrl <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id='imagePath'
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                placeholder="http://image.png"
                                value={input.imagePath}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-semibold mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                                id='description'
                                placeholder="Describe your food item in detail..."
                                rows="5"
                                value={input.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Food Item
                        </button>

                        <button
                            type="button"
                            onClick={() => setInput({ name: '', price: '', imagePath: '', description: '' })}
                            className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Clear Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default updateFoodItem