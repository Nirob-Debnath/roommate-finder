import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import BrowseLisitingCard from './BrowseListingCard';

const BrowseLisitng = () => {
    const initialfindRoommates = useLoaderData();
    const [findRoommates, setFindRoommates] = useState(initialfindRoommates);
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    findRoommates.map(findRoommate => <BrowseLisitingCard key={findRoommate._id}
                        findRoommates={findRoommates}
                        setFindRoommates={setFindRoommates}
                        findRoommate={findRoommate}></BrowseLisitingCard>)
                }
            </div>
        </div>
    );
};

export default BrowseLisitng;