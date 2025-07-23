import { useContext, useState, useEffect } from 'react'
import Driver from '../assets/driver (2).png'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  const [currentShiftStart, setCurrentShiftStart] = useState(null);
  const [hoursOnline, setHoursOnline] = useState(0);
  const [todayStats, setTodayStats] = useState({
    totalRides: 12,
    totalEarnings: 2340.50,
    totalDistance: 145.2,
    avgRating: 4.8,
    acceptanceRate: 85,
    onlineTime: 8.5
  });

  // Track online hours
  useEffect(() => {
    if (captain?.status === 'active') {
      if (!currentShiftStart) {
        setCurrentShiftStart(new Date());
      }
      
      const interval = setInterval(() => {
        if (currentShiftStart) {
          const now = new Date();
          const diffInMs = now - currentShiftStart;
          const diffInHours = diffInMs / (1000 * 60 * 60);
          setHoursOnline(diffInHours);
        }
      }, 60000);

      return () => clearInterval(interval);
    } else {
      setCurrentShiftStart(null);
      setHoursOnline(0);
    }
  }, [captain?.status, currentShiftStart]);

  const formatTime = (hours) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.floor((hours - wholeHours) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!captain) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gray-700 rounded-full"></div>
            <div className="h-4 w-24 bg-gray-700 rounded"></div>
          </div>
          <div className="h-6 w-16 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-80 overflow-y-auto custom-scrollbar">
      <div className="space-y-4">
        {/* Captain Info & Today's Earnings - Compact */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-3'>
            <div className="relative">
              <img 
                className='h-12 w-12 rounded-full object-contain border-2 border-gray-600' 
                src={Driver} 
                alt="Captain Avatar" 
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                captain.status === 'active' ? 'bg-green-500' : 'bg-gray-500'
              }`}></div>
            </div>
            <div>
              <h4 className='text-base font-semibold capitalize text-white'>
                {captain.fullname?.firstname + " " + captain.fullname?.lastname}
              </h4>
              <p className='text-xs text-gray-400'>
                {captain.vehicle?.vehicleType} • {captain.vehicle?.plate}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <i className="ri-star-fill text-yellow-500 text-xs"></i>
                <span className="text-xs text-gray-300">{todayStats.avgRating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <h4 className='text-xl font-bold text-green-500'>
              {formatCurrency(todayStats.totalEarnings)}
            </h4>
            <p className='text-xs text-gray-400'>Today</p>
          </div>
        </div>

        {/* Quick Stats Grid - Compact */}
        <div className='grid grid-cols-3 gap-3 p-3 bg-gray-900 rounded-lg border border-gray-800'>
          <div className='text-center'>
            <i className="ri-timer-2-line text-lg text-blue-400 mb-1"></i>
            <h5 className='text-sm font-semibold text-white'>
              {captain.status === 'active' ? formatTime(hoursOnline) : '0h 0m'}
            </h5>
            <p className='text-xs text-gray-400'>Online</p>
          </div>
          
          <div className='text-center'>
            <i className="ri-roadster-line text-lg text-green-400 mb-1"></i>
            <h5 className='text-sm font-semibold text-white'>
              {todayStats.totalDistance.toFixed(1)} km
            </h5>
            <p className='text-xs text-gray-400'>Distance</p>
          </div>
          
          <div className='text-center'>
            <i className="ri-check-double-line text-lg text-purple-400 mb-1"></i>
            <h5 className='text-sm font-semibold text-white'>
              {todayStats.acceptanceRate}%
            </h5>
            <p className='text-xs text-gray-400'>Accept</p>
          </div>
        </div>

        {/* Performance Summary - Single Row */}
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h6 className="text-xs text-gray-400">Rides</h6>
              <p className="text-sm font-semibold text-white">{todayStats.totalRides}</p>
            </div>
            <div className="text-center flex-1">
              <h6 className="text-xs text-gray-400">Rating</h6>
              <p className="text-sm font-semibold text-yellow-400">{todayStats.avgRating} ★</p>
            </div>
            <div className="text-center flex-1">
              <h6 className="text-xs text-gray-400">Completion</h6>
              <p className="text-sm font-semibold text-green-400">98%</p>
            </div>
          </div>
        </div>

        {/* Daily Goal Progress - Compact */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-3 border border-blue-800">
          <div className="flex items-center justify-between mb-2">
            <h6 className="text-sm font-medium text-white flex items-center gap-2">
              <i className="ri-target-line"></i>
              Daily Goal
            </h6>
            <span className="text-xs text-gray-300">
              {Math.round((todayStats.totalEarnings / 3000) * 100)}% complete
            </span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">Earnings</span>
                <span className="text-white">₹{todayStats.totalEarnings.toFixed(0)} / ₹3,000</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((todayStats.totalEarnings / 3000) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Banner - Compact */}
        <div className={`p-2 rounded-lg border ${
          captain.status === 'active' 
            ? 'bg-green-900 border-green-700 text-green-100' 
            : 'bg-gray-900 border-gray-700 text-gray-300'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <i className={`ri-radio-button-line ${
                captain.status === 'active' ? 'text-green-400' : 'text-gray-400'
              }`}></i>
              <span className="text-xs font-medium">
                {captain.status === 'active' ? 'Ready for rides' : 'Offline'}
              </span>
            </div>
            {captain.status === 'active' && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs">Live</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails