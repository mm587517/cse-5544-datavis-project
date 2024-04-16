'use client';
import { useState } from 'react';
import HeatMap from './components/Heatmap';
import Histogram from './components/Histogram';

export default function Home() {
  const [showHeatMap, setShowHeatMap] = useState(true);

  const toggleView = () => {
    setShowHeatMap(!showHeatMap);
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden w-2/3'>
        <h1 className='text-3xl text-red-600 font-bold p-6'>
          US Crashes Throughout 2023
        </h1>
        <div className='flex justify-center p-4'>
          <button
            onClick={toggleView}
            className='inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transform transition duration-300 ease-in-out hover:scale-105'
          >
            {showHeatMap ? 'Show Histogram' : 'Show Heatmap'}
          </button>
        </div>
        {showHeatMap ? <HeatMap /> : <Histogram />}
      </div>
    </div>
  );
}
