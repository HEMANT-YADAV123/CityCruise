import logo from '../assets/CityCruise__2_-removebg-preview.png'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      {/* Hero Section */}
      <div className='relative min-h-screen flex flex-col'>
        {/* Background Image with Overlay */}
        <div 
          className='absolute inset-0 bg-cover bg-center bg-[url(https://store.yeelight.com/cdn/shop/articles/The_Accidental_Invention_How_the_Traffic_Light_Came_to_Be_1280x1100_crop_center.png?v=1700395912)]'
        >
          <div className='absolute inset-0 bg-black bg-opacity-40'></div>
        </div>

        {/* Header */}
        <div className='relative z-10 p-6 lg:p-8'>
          <img className='w-32 h-16 invert' src={logo} alt="CityCruise" />
        </div>

        {/* Main Content */}
        <div className='relative z-10 flex-1 flex items-center justify-center px-6 lg:px-8'>
          <div className='text-center text-white max-w-2xl'>
            <h1 className='text-4xl lg:text-6xl font-bold mb-6 leading-tight'>
              Your ride is just a 
              <span className='text-green-400'> tap away</span>
            </h1>
            <p className='text-xl lg:text-2xl text-gray-200 mb-8 max-w-xl mx-auto'>
              Experience seamless transportation with CityCruise - safe, reliable, and affordable rides whenever you need them.
            </p>
            
            {/* Feature highlights */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto'>
              <div className='flex flex-col items-center p-4'>
                <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                  </svg>
                </div>
                <h3 className='text-lg font-semibold mb-2'>Safe & Secure</h3>
                <p className='text-gray-300 text-sm'>Verified drivers and real-time tracking</p>
              </div>
              
              <div className='flex flex-col items-center p-4'>
                <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z' clipRule='evenodd' />
                  </svg>
                </div>
                <h3 className='text-lg font-semibold mb-2'>Affordable</h3>
                <p className='text-gray-300 text-sm'>Transparent pricing with no hidden fees</p>
              </div>
              
              <div className='flex flex-col items-center p-4'>
                <div className='w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3'>
                  <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                  </svg>
                </div>
                <h3 className='text-lg font-semibold mb-2'>24/7 Available</h3>
                <p className='text-gray-300 text-sm'>Round-the-clock service support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className='relative z-10 bg-white bg-opacity-95 backdrop-blur-sm p-6 lg:p-8 m-4 lg:m-6 rounded-2xl shadow-2xl'>
          <div className='max-w-md mx-auto text-center'>
            <h2 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3'>
              Get Started With CityCruise
            </h2>
            <p className='text-gray-600 mb-6'>
              Join thousands of satisfied customers who choose CityCruise for their daily commute
            </p>
            
            <div className='space-y-4'>
              <Link 
                to='/login' 
                className='flex items-center justify-center w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-base'
              >
                <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                </svg>
                Continue as Passenger
              </Link>
              
              <Link 
                to='/captain-login' 
                className='flex items-center justify-center w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-base'
              >
                <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                Drive with CityCruise
              </Link>
            </div>
            
            <div className='mt-6 text-center text-sm text-gray-500'>
              <p>© 2024 CityCruise. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Start