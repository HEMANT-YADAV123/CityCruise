import React from 'react'
import car from '../assets/car.png'

const WaitingForDriver = (props) => {
  return (
    <div>
          <h5 onClick={()=>{props.setwaitingForDriver(false)}} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <div className='flex items-center justify-between'>
              <img className='h-12' src={car} alt="" />
              <div className='text-right'>
                <h2 className='text-lg font-medium'>Sarthak</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>RJ14 12AD 345</h4>
                <p className='font-sm text-gray-600'>Maruti Suzuki Alto</p>
              </div>
            </div>
                <div className='flex gap-2 flex-col justify-between items-center'>
                  <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'> 
                    <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab ,Ahemdabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill "></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab ,Ahemdabad</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 '>
                        <i className="text-lg ri-currency-line "></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹193.20</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                  </div>
    
                </div>
    </div>
  )
}

export default WaitingForDriver
