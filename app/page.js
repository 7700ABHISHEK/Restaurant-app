'use client'
import React, { useState, useEffect } from 'react'
import CustomerHeader from './_components/CustomerHeader'
import CustomerFooter from './_components/CustomerFooter'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const page = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('Select Location')
  const [cities, setCities] = useState([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter();

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true)
      try {
        const response = await fetch("/api/customer/location")
        const data = await response.json()
        if (data.success === true) {
          setCities(data.result)
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error)
      } finally {
        setLoadingCities(false)
      }
    }
    fetchCities()
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput) {
        loadRestaurant({ restaurant: searchInput });
      } else {
        loadRestaurant();
      }
    }, 200)

    return () => clearTimeout(timer);
  }, [searchInput])

  const filteredCities = locationSearch
    ? cities.filter(city =>
      city.toLowerCase().includes(locationSearch.toLowerCase())
    )
    : cities

  const handleLocationSelect = (city) => {
    setSelectedLocation(city)
    setLocationSearch('')
    setShowLocationDropdown(false)
    loadRestaurant({ location: city });
  }

  const detectCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setSelectedLocation('Current Location')
          setShowLocationDropdown(false)
        },
        () => {
          alert('Unable to detect location. Please enter manually.')
        }
      )
    }
  }

  const loadRestaurant = async (params) => {
    if (!params) {
      setLoading(true)
    }
    try {
      let url = '/api/customer';
      if (params?.location) {
        url = url + "?location=" + params.location
      } else if (params?.restaurant) {
        url = url + "?restaurant=" + params.restaurant
      }
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setRestaurants(data.result)
      } else {
        setRestaurants([])
      }
    } catch (error) {
      console.error('Failed to load restaurants:', error)
      setRestaurants([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      
      <main className="flex-1 bg-gray-50 py-8 pb-16">
        <div className="container mx-auto px-4">
          {/* Search Section */}
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Your Favorite Restaurant</h2>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Input */}
              <div className="relative w-full md:w-80">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="w-full flex items-center gap-2 px-2 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-all duration-200"
                >
                  <svg className="w-5 h-5 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs text-gray-500 font-medium">Delivery Location</p>
                    <p className="text-sm font-semibold text-gray-800 truncate">{selectedLocation}</p>
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Location Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute top-full mt-2 w-full md:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search for city..."
                          value={locationSearch}
                          onChange={(e) => setLocationSearch(e.target.value)}
                          className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                          autoFocus
                        />
                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <button
                        onClick={detectCurrentLocation}
                        className="mt-3 w-full flex items-center gap-2 px-4 py-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Use current location</span>
                      </button>
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {loadingCities ? (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <p>Loading cities...</p>
                        </div>
                      ) : filteredCities.length > 0 ? (
                        filteredCities.map((city, index) => (
                          <button
                            key={index}
                            onClick={() => handleLocationSelect(city)}
                            className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                          >
                            <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">{city}</p>
                            </div>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <p>No cities found</p>
                          <p className="text-sm mt-1">Try searching with different keywords</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for restaurants, cuisines, or dishes..."
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full px-5 py-3 pl-12 pr-4 text-gray-700 bg-gray-100 border-2 border-transparent rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-200"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading restaurants...</p>
              </div>
            </div>
          ) : restaurants.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {restaurants.length} Restaurant{restaurants.length !== 1 ? 's' : ''} Found
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <Link 
                    href={`/explore/${restaurant.name.toLowerCase() + `?id=${restaurant._id}`}`} 
                    key={restaurant._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                      <span className="text-6xl">🍽️</span>
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
                        ⭐ 4.2
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors">
                        {restaurant.name}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span>{restaurant.city}, {restaurant.state}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>{restaurant.address}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span>{restaurant.number}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>30-40 min</span>
                        </div>
                        <div className="text-sm font-semibold text-orange-600">
                          View Menu →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Restaurants Found</h3>
              <p className="text-gray-600">Try searching with different location or restaurant name</p>
            </div>
          )}
        </div>
      </main>
      
      <CustomerFooter />
    </div>
  )
}

export default page