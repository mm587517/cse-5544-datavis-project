'use client';
import { useState } from 'react';
import HeatMap from './components/Heatmap';
import Histogram from './components/Histogram';
import Piechart from './components/Piechart';


export default function Home() {
  const [viewIndex, setViewIndex] = useState(0); // 0: HeatMap, 1: Histogram, 2: PieChart

  const switchToHeatMap = () => {
    setViewIndex(0);
  };

  const switchToHistogram = () => {
    setViewIndex(1);
  };

  const switchToPieChart = () => {
    setViewIndex(2);
  };

  const getViewComponent = () => {
    switch (viewIndex) {
      case 0:
        return <HeatMap />;
      case 1:
        return <Histogram />;
      case 2:
        return <Piechart />;
      default:
        return <HeatMap />; // Default to HeatMap
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden w-2/3'>
        <h1 className='text-3xl text-red-600 font-bold p-6'>
          US Crashes Throughout 2023
        </h1>
        <div className='flex justify-center p-4'>
          <button
            onClick={switchToHeatMap}
            className='inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transform transition duration-300 ease-in-out hover:scale-105 mr-2'
          >
            Show HeatMap
          </button>
          <button
            onClick={switchToHistogram}
            className='inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transform transition duration-300 ease-in-out hover:scale-105 mr-2'
          >
            Show Histogram
          </button>
          <button
            onClick={switchToPieChart}
            className='inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transform transition duration-300 ease-in-out hover:scale-105'
          >
            Show PieChart
          </button>
        </div>
        {getViewComponent()}
      </div>
    </div>
  );
}
