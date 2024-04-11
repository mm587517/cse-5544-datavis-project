'use client';

//@ts-ignore
import { TableauEmbed } from '@stoddabr/react-tableau-embed-live';

import { useState } from 'react';

interface Region {
  morning: string;
  afternoon: string;
  evening: string;
  night: string;
}

export default function Home() {
  const midwest: Region = {
    morning:
      'https://public.tableau.com/views/accidents-midwest-morning/Sheet2?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link',
    afternoon:
      'https://public.tableau.com/views/accidents-midwest-afternoon/Sheet2?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link',
    evening:
      'https://public.tableau.com/views/accidents-midwest-evening/Sheet2?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link',
    night:
      'https://public.tableau.com/views/accidents-midwest-night/Sheet2?:language=en-US&publish=yes&:sid=&:display_count=n&:origin=viz_share_link',
  };

  const [selectedTime, setSelectedTime] = useState<keyof Region>('morning');
  const [multiView, setMultiView] = useState(false);

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const time = e.target.value as keyof Region;
    setSelectedTime(time);
  };

  const toggleView = () => {
    setMultiView(!multiView);
  };

  const renderTableauEmbed = (time: keyof Region) => {
    return (
      <div key={time} className={multiView ? "w-1/2 h-auto p-2" : "w-full h-auto p-2"}>
        <h3 className="text-xl font-semibold mb-2">{time.charAt(0).toUpperCase() + time.slice(1)}</h3>
        <div className="w-full h-96"> {/* Consider making the height dynamic or adjusted for multi-view */}
          <TableauEmbed sourceUrl={midwest[time]} />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-2/3">
        <h1 className="text-3xl text-red-800 font-bold p-6">Crashes in the US from 2023</h1>

        <div className="p-6">
          <div className="flex justify-between mb-4">
            {!multiView && <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Select Time:</label>
              <select
                id="time"
                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                value={selectedTime}
                onChange={handleTimeChange}
              >
                {Object.keys(midwest).map((time) => (
                  <option key={time} value={time}>
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </option>
                ))}
              </select>
            </div>}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={toggleView}
            >
              {multiView ? "Switch to Single View" : "Switch to Multi View"}
            </button>
          </div>
          <div className={multiView ? "flex flex-wrap -mx-2" : ""}> {/* Updated to use flexbox instead of grid */}
            {multiView
              ? Object.keys(midwest).map((time) => renderTableauEmbed(time as keyof Region))
              : renderTableauEmbed(selectedTime)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
