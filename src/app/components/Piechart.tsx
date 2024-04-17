'use client';

//@ts-ignore
import { TableauEmbed } from '@stoddabr/react-tableau-embed-live';

import React, { useState } from 'react';

interface RegionData {
    morning: string;
    afternoon: string;
    evening: string;
    night: string;
}

interface Region {
    name: string;
    data: RegionData;
}

export default function Piechart() {
    const regions: Region[] = [
        {
            name: 'Midwest',
            data: {
                "morning": "https://public.tableau.com/views/midwest_morning/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "afternoon": "https://public.tableau.com/views/midwest_afternoon_17133146974390/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "evening": "https://public.tableau.com/views/midwest_evening_17133148115600/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "night": "https://public.tableau.com/views/midwest_night_17133149214360/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link"
            }
        },
        {
            name: 'Northeast',
            data: {
                "morning": "https://public.tableau.com/views/northeast_morning_17133150705640/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "afternoon": "https://public.tableau.com/views/northeast_afternoon_17133151769870/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "evening": "https://public.tableau.com/views/northeast_evening_17133152629400/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "night": "https://public.tableau.com/views/northeast_night_17133154159960/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link"
            }
        },
        {
            name: 'South',
            data: {
                "morning": "https://public.tableau.com/views/south_morning_17133156040300/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "afternoon": "https://public.tableau.com/views/south_afternoon_17133157717070/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "evening": "https://public.tableau.com/views/south_evening_17133158824550/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "night": "https://public.tableau.com/views/south_night_17133159718340/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link"
            }
        },
        {
            name: 'West',
            data: {
                "morning": "https://public.tableau.com/views/west_morning_17133161037980/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "afternoon": "https://public.tableau.com/views/west_afternoon_17133162292600/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "evening": "https://public.tableau.com/views/west_evening_17133163347110/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link",
                "night": "https://public.tableau.com/views/west_night_17133164384820/Sheet1?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link"
            }
        },

    ]

    const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
    const [selectedTime, setSelectedTime] = useState<keyof RegionData>('morning');
    const [multiView, setMultiView] = useState(false);

    const handleRegionChange = (region: Region) => {
        setSelectedRegion(region);
        setSelectedTime('morning'); // Reset selected time when changing region
    };

    const handleTimeChange = (time: keyof RegionData) => {
        setSelectedTime(time);
    };

    const toggleView = () => {
        setMultiView(!multiView);
    };

    return (
        <div className='p-6'>
            <div className='relative w-48'>
                <label
                    htmlFor='region'
                    className='block text-sm font-medium text-gray-700'
                >
                    Select Region:
                </label>
                <select
                    id='region'
                    className='block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-white text-gray-900 appearance-none pl-2'
                    value={selectedRegion.name}
                    onChange={(e) =>
                        handleRegionChange(
                            regions.find((region) => region.name === e.target.value) ||
                            regions[0]
                        )
                    }
                >
                    {regions.map((region) => (
                        <option key={region.name} value={region.name}>
                            {region.name}
                        </option>
                    ))}
                </select>
            </div>

            {!multiView && (
                <div className='mt-4'>
                    <div className='relative w-48'>
                        <label
                            htmlFor='time'
                            className='block text-sm font-medium text-gray-700'
                        >
                            Select Time:
                        </label>
                        <select
                            id='time'
                            className='block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 bg-white text-gray-900 appearance-none pl-2'
                            value={selectedTime}
                            onChange={(e) =>
                                handleTimeChange(e.target.value as keyof RegionData)
                            }
                        >
                            {Object.keys(selectedRegion.data).map((time) => (
                                <option key={time} value={time}>
                                    {time.charAt(0).toUpperCase() + time.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
            <div className='mt-4'>
                <button
                    className='inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600 transform transition duration-300 ease-in-out hover:scale-105'
                    onClick={toggleView}
                >
                    {multiView ? 'Switch to Single View' : 'Switch to Multi View'}
                </button>
            </div>
            <div className='mt-4 flex flex-wrap -mx-2'>
                {multiView ? (
                    Object.keys(selectedRegion.data).map((time) => (
                        <div
                            key={`${selectedRegion.name}-${time}`}
                            className='w-1/2 h-auto p-2'
                        >
                            <h3 className='text-xl font-semibold mb-2'>
                                {time.charAt(0).toUpperCase() + time.slice(1)}
                            </h3>
                            <div className='w-full h-96'>
                                <TableauEmbed
                                    sourceUrl={selectedRegion.data[time as keyof RegionData]}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='w-full h-auto p-2'>
                        <h3 className='text-xl font-semibold mb-2'>
                            {selectedRegion.name} -{' '}
                            {selectedTime.charAt(0).toUpperCase() + selectedTime.slice(1)}
                        </h3>
                        <div className='w-full h-96'>
                            <TableauEmbed sourceUrl={selectedRegion.data[selectedTime]} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
