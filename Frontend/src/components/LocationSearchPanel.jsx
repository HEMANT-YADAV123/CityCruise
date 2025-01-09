/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
    
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
        setPickup(suggestion)
    } else if (activeField === 'destination') {
        setDestination(suggestion)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
}

  return (
    <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} 
                    onClick={() => handleSuggestionClick(elem)} 
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black hover:border-black rounded-xl items-center my-2 justify-start shrink-0 mt-5'>
                        <div className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'>
                          <i className="ri-map-pin-fill text-lg"></i>
                        </div>
                        <div className='flex-1'>
                        <h4 className='font-medium '>{elem}</h4>
                        </div>
                    </div>
                ))
            }
      </div>
  )
}

export default LocationSearchPanel
