import React from 'react'

const LocationSearchPanel = (props) => {
    
    // sample array for location
    const loactions = [
        "24B Near kapoor's cafe ,Sheriyans Cod School,Bhopal",
        "242B Near poor's cafe ,Sheriyans Coding Schoolhopal",
        "232B Near or's cae ,Sheriyans Coding School,Bhopal",
        "245B Near k's cafe ,Sheriyans Codg School,Bhal"

    ]
  return (
    <div>
      {/* demo location info */}
      {
        loactions.map(function(elem,idx){
            return <div key={idx} onClick={()=>{
                props.setVehiclePanel(true)
                props.setPanelOpen(false)
            }} className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start gap-4'>
            <h2 className='bg-[#eee] h-8 w-12 rounded-full flex items-center justify-center'><i className="ri-map-pin-fill "></i></h2>
            <h4 className='font-medium'>{elem}</h4>
          </div>
        })
      }

    </div>
  )
}

export default LocationSearchPanel
