import React from 'react'
import Driver from '../assets/Driver.png'

const CaptainDetails = () => {
  return (
    <div>
        <div className='flex items-center justify-between'>
              <div className='flex items-center justify-start gap-3'>
                <img className='h-14 w-14 rounded-full object-cover' src={Driver} alt="" />
                <h4 className='text-lg font-medium'>Harsh Patel</h4>
              </div>
              <div>
                <h4 className='text-xl font-semibold'>₹295.2</h4>
                <p className='text-sm text-gray-600'>Earned</p>
              </div>
          </div>
          <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-extralight  ri-timer-2-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-extralight  ri-speed-up-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
              <div className='text-center'>
                <i className="text-3xl mb-2 font-extralight  ri-booklet-line"></i>
                <h5 className='text-lg font-medium'>10.2</h5>
                <p className='text-sm text-gray-600'>Hours Online</p>
              </div>
          </div>
    </div>
  )
}

export default CaptainDetails
