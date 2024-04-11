import HeatMap from './components/Heatmap';
import Histogram from './components/Histogram';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg overflow-hidden w-2/3'>
        <h1 className='text-3xl text-red-600 font-bold p-6'>
          US Crashes Throughout 2023
        </h1>
        <Histogram />
      </div>
    </div>
  );
}
