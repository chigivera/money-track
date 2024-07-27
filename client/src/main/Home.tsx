import React, { useEffect } from 'react';
import Dashboard from './home/Dashboard';
import Profile from './home/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/slice/userSlice';
import { RootState } from '../store/store';


const Home: React.FC = () => {
 
    return (
      <div className='Home flex flex-wrap w-full justify-start'>
        <div className="flex flex-col w-full md:w-2/3 lg:w-3/4">
          <div className="text-4xl font-bold text-gray-800 mt-2 p-2">
            Dashboard
          </div>
          <Dashboard />
        </div>
        <div className="flex flex-col w-full md:w-1/3 lg:w-1/4">
          <Profile />
        </div>
      </div>
    );
}

export default Home

